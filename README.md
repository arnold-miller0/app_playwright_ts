# Sample Playwright TypeScript App

Valid on 8 Dec 2024
Playwright TypeScript sample App task list

## Directories

### data 
contains test case - data json files
- **tc_01.json** - Test Case 1 assigment required
- **tc_02.json** - Test Case 2 assigment required
- **tc_03.json** - Test Case 3 assigment required
- **tc_04.json** - Test Case 4 assigment required
- **tc_05.json** - Test Case 5 assigment required
- **tc_06.json** - Test Case 6 assigment required
- **tc_07e.json** - Test Case 7e assigment extra
- **tc_08e.json** - Test Case 8e assigment extra
- **tc_09e.json** - Test Case 9e assigment extra
- **tc_err.json** - Test Case data to manually check error handling

### tests
contains test case - typeScript test specification files
- **app_login.spec.ts** 
  - login to app before each test 
  - has the 6 required test specs to 
    - check Project has specific column-task with specific tag values
  - has 3 extra test specs
    - required test spec checks
    - added checks for column-task's owner and date values

### Utils
contains test case - typeScript utillty function for web site access and checks
- **app_utils.ts** - App website utilities
  - get, find, return web DOM elements 
  - check Project has specific column-task with
    - required specific tag values
    - optional owner and date values

## DONE
