import { Bet } from "../models/bet";

export const allBets: Bet[] = [
    {
        name: 'Gender',
        displayName: 'Gender',
        increment: 2,
        odds: '1/2',
        description: 'Will it be a boy or girl?',
        amount: 0,
        options: [
            {
                name: 'Boy',
                label: 'Boy'
            },
            {
                name: 'Girl',
                label: 'Girl'
            }
        ],
        
    },{
        name: 'BirthTime',
        displayName: 'Time of delivery',
        increment: 2,
        odds: '1/6',
        amount: 0,
        description: 'The minute that the birth occurs, in 10 minute increments',
        options: [
            {
                name: '0',
                label: '0-9'
            },
            {
                name: '10',
                label: '10-19'
            },
            {
                name: '20',
                label: '20-29'
            },
            {
                name: '30',
                label: '30-39'
            },
            {
                name: '40',
                label: '40-49'
            },
            {
                name: '50',
                label: '50-59'
            }
        ]
    },{
        name: 'BabyName',
        displayName: 'Baby\'s Name',
        increment: 2,
        odds: '1/2',
        description: 'What letter will the baby\'s name start with?',
        amount: 0,
        options: [
            {
                name: 'A',
                label: 'A'
            },
            {
                name: 'BZ',
                label: 'B-Z'
            }
        ]
    },{
        name: 'BabyWeight',
        displayName: 'Baby\'s Weight',
        increment: 2,
        odds: '1/6',
        amount: 0,
        description: 'The baby\'s weight, in 5oz increments',
        options: [
            {
                name: 'lt7',
                label: 'less than 7lbs'
            },
            {
                name: '7lb5',
                label: '7lbs to 7lbs 5oz'
            },
            {
                name: '7lb12',
                label: '7lbs 6oz to 7lbs 12oz'
            },
            {
                name: '8lb2',
                label: '7lbs 13oz to 8lbs 2oz'
            },
            {
                name: '8lb9oz',
                label: '8lbs 3oz to 8lb 9oz'
            },
            {
                name: 'gt8lb10',
                label: 'more than 8lb 9oz'
            }
        ]
    },{
        name: 'AlexPassOut',
        displayName: 'Alex Passes Out',
        increment: 2,
        odds: '1/2',
        amount: 0,
        description: 'Alex passes out during the birth or c-section',
        options: [
            {
                name: 'Yes',
                label: 'Yes'
            },
            {
                name: 'No',
                label: 'No'
            }
        ]
    },{
        name: 'AlexCutsCord',
        displayName: 'Alex cuts the cord',
        increment: 2,
        odds: '1/2',
        amount: 0,
        description: 'Alex cuts the cord',
        options: [
            {
                name: 'Yes',
                label: 'Yes'
            },
            {
                name: 'No',
                label: 'No'
            }
        ]
    }
]