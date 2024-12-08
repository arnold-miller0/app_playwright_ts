import { test } from '@playwright/test';
import * as fs from 'fs'
import { checkProjColTaskAttrs } from '../utils/app_utils';

test.beforeEach(async ({ page }) => {
    // alway login before each test
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
   
    // enter user, password 
    await page.locator('input#username').fill('admin');
    await page.locator('input#password').fill('password123');
    
    // click on submit button
    await page.locator('button[type="submit"]').click();
});

// app json input schema 
interface AppJsonSchema { 
	project: string; // app Left side project text
	column: string; // app column text
	task: string;   // app column's task text
	tags: string[]; // app task's tag list text
	owner: string;  // app task's owner text
	date: string;   // app task's date text
}

// function read and Parse Json File as AppJsonSchema
const readParseJsonInfo = (
    jsonFileName:string // Json Data input file
    ):AppJsonSchema => 
    {
    //
    const rawData = fs.readFileSync(jsonFileName, 'utf-8');
    const data: AppJsonSchema = JSON.parse(rawData);
    return data
};

// Test Case 1 required
test('Test Case 1', async ({ page }) => {
    const jsonInfo:AppJsonSchema = readParseJsonInfo('./data/tc_01.json')
    await checkProjColTaskAttrs(page, jsonInfo.project, 
        jsonInfo.column, jsonInfo.task, jsonInfo.tags);
});

// Test Case 2 required
test('Test Case 2', async ({ page }) => {
    const jsonInfo:AppJsonSchema = readParseJsonInfo('./data/tc_02.json')
    await checkProjColTaskAttrs(page, jsonInfo.project, 
        jsonInfo.column, jsonInfo.task, jsonInfo.tags);
});

// Test Case 3 required
test('Test Case 3', async ({ page }) => {
    const jsonInfo:AppJsonSchema = readParseJsonInfo('./data/tc_03.json')
    await checkProjColTaskAttrs(page, jsonInfo.project, 
        jsonInfo.column, jsonInfo.task, jsonInfo.tags);
});

// Test Case 4 required
test('Test Case 4', async ({ page }) => {
    const jsonInfo:AppJsonSchema = readParseJsonInfo('./data/tc_04.json')
    await checkProjColTaskAttrs(page, jsonInfo.project, 
        jsonInfo.column, jsonInfo.task, jsonInfo.tags);
});

// Test Case 5 required
test('Test Case 5', async ({ page }) => {
    const jsonInfo:AppJsonSchema = readParseJsonInfo('./data/tc_05.json')
    await checkProjColTaskAttrs(page, jsonInfo.project, 
        jsonInfo.column, jsonInfo.task, jsonInfo.tags);
});

// Test Case 6 required
test('Test Case 6', async ({ page }) => {
    const jsonInfo:AppJsonSchema = readParseJsonInfo('./data/tc_06.json')
    await checkProjColTaskAttrs(page, jsonInfo.project, 
        jsonInfo.column, jsonInfo.task, jsonInfo.tags);
});

// Test Case 7 optional owner 
test('Test Case 7e', async ({ page }) => {
    const jsonInfo:AppJsonSchema = readParseJsonInfo('./data/tc_07e.json')
    await checkProjColTaskAttrs(page, jsonInfo.project, 
        jsonInfo.column, jsonInfo.task, jsonInfo.tags,
		jsonInfo.owner, jsonInfo.date);
});

// Test Case 8 optional date
test('Test Case 8e', async ({ page }) => {
    const jsonInfo:AppJsonSchema = readParseJsonInfo('./data/tc_08e.json')
    await checkProjColTaskAttrs(page, jsonInfo.project, 
        jsonInfo.column, jsonInfo.task, jsonInfo.tags,
		jsonInfo.owner, jsonInfo.date);
});

// Test Case 9 optional date, owner 
test('Test Case 9e', async ({ page }) => {
    const jsonInfo:AppJsonSchema = readParseJsonInfo('./data/tc_09e.json')
    await checkProjColTaskAttrs(page, jsonInfo.project, 
        jsonInfo.column, jsonInfo.task, jsonInfo.tags,
		jsonInfo.owner, jsonInfo.date);
});
