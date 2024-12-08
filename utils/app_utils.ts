import { expect, type Page, Locator } from '@playwright/test';

// utility function Select Project 
const goToProject = async (
	// select project from left side menu
	page:Page, // App web page
	projText: string // App Project's text
	): Promise<void> => 
	{
    //
    const projTask:Locator = await page.locator(`button > h2:has-text("${projText}")`);
    await projTask.locator('..').click();
    const mainPageInfo:Locator = await page.locator(`h1:has-text("${projText}")`);
 
    const textValue = await mainPageInfo.innerText();
};

// utility function return Project's Column Element via text
const getColumn = async (
	page:Page, // App web page
	projText:string, // App Project's text
	colText:string // Column Text
	): Promise<Locator> => // Return DOM Element
	{
    //
    await goToProject(page, projText);
    const header:Locator = await page.locator(`div > h2:has-text("${colText}")`);
    return await header.locator('..').locator('h3');
};

// utility function return Task in Column Element via text
const getTaskColumn = async (
	colTasks:Locator, // Column Element
	searchText:string // Task Text to find
	): Promise<Locator> => // Return DOM Element
	{
    //
    const task:Locator = await colTasks.getByText(searchText);
    return await task.locator('..');
};


// utility function return Task's Tag list Elments
const getTaskTagList = async (
	task:Locator // task Element to get task's from attributes
	): Promise<Locator[]> => // Return DOM Elements
    { 
    // date is Attribute list's last position
    // owner is Attribute list's last-1 position
    // tags are other Atttribute list positions (from 1 to last-2 position)

    // Get all Atrributes 
    const AttrAll:Locator =  await task.locator('div > span');
    const count:number = await AttrAll.count();
    const sublist: Locator[] = [];
    for (let i = 0; i < count-2; i++) {
	    sublist.push(AttrAll.nth(i));
    }
    return sublist;
};


// utility function does any Task's tags have this Text
// Return True when find text; otherwise False
const doesTagExist = async (
	tagList:Locator[], // Task's Tag list elements
	searchText:string //  task text to find
	): Promise<boolean> => // return boolean
	{
    for (const tagElem of tagList) {
	    const innerText:string = await tagElem.innerText();
	    if (innerText === searchText) {
	        return true;
	    }
    }
    return false;
};
   
// utility check if Attribute locator has text
const doesAttrText = async (
    attrLoc: Locator, // Task Attribute Element
    searchText: string // Text to have
): Promise<void> => {
    // searchText to find is not empty
    expect(searchText.trim()).not.toBe('');
    const innerText:string = await attrLoc.innerText();
    await expect(innerText).toBe(searchText)
};

// utility function check for Project, Column, Task, tag-list
// optional check for Owner and Date
// outputs searched Project, Column, Task, tag-list, Owner, Date text
export const checkProjColTaskAttrs = async (
	page:Page, // App Web Page
	projText:string, // Project Text to find - required
	colText:string,  // Column text to find - required
	taskText:string, // Task text to find - required
	tagTextList:string[], // Tag List text to match - required
	ownerText?:string, // Owner text to match - optional
	dateText?:string   // Date Text to match - optional
	): Promise<void> => 
	{
    // projText not null, undefined or empty string 
    console.log(`Project: ${projText}`);
    expect(projText && projText.trim()).toBeTruthy();

    // colText not null, undefined or empty string 
    console.log(`Column: ${colText}`);
    expect(colText && colText.trim()).toBeTruthy();

    // taskText not null, undefined or empty string 
    console.log(` Task: ${taskText}`);
    expect(taskText && taskText.trim()).toBeTruthy();

    // tagTextList not null, undefined or empty List 
    expect(tagTextList).toBeTruthy();
    expect(tagTextList.length).toBeGreaterThan(0);

    const colTasks:Locator = await getColumn(page, projText.trim(), colText.trim());
    const taskLoc:Locator = await getTaskColumn(colTasks,  taskText.trim());
    const tagList:Locator[] = await getTaskTagList(taskLoc)
    for (const tagText of tagTextList) {
        // tagText not null, undefined or empty string 
        console.log(`  Tag: ${tagText}`); 
        expect(tagText && tagText.trim()).toBeTruthy();
        const exist:boolean = await doesTagExist(tagList, tagText);
        await expect(exist).toBe(true);
    }

    // Optional check for Owner and Date when not null or undefined
    const AttrAll:Locator =  await taskLoc.locator('div > span');
    const count:number = await AttrAll.count();
    
    // check Owner text when not null or undefined
    if (ownerText != null && ownerText != undefined) {
	    console.log(`  Owner: ${ownerText}`); 
        
        // Owner is Task's Atrribute list's last-1 position
        await doesAttrText(AttrAll.nth(count-2), ownerText)
    }

    // check Date text when not null or undefined
    if (dateText != null && dateText != undefined) {
	    console.log(`  Date: ${dateText}`); 

        // date is Task's Attribute list's last position
        await doesAttrText(AttrAll.nth(count-1), dateText)
    }
    
};

