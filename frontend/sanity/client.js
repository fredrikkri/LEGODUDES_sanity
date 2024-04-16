import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: "t7gl08z7",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-03-07"
})

// legodudes_reviews token code
// skJrSKAbSidzw5NQ7NMIl2Oy9hDKiqZ8nPCzPuj5S5EMtVpmFDl0s7Y3xIMhCJCa4WZBYnc9lOIZKtfITejtetRYKnw13NklPUspgiA0c89JG7ORnCmDccdJAx5BPLqckU3CXyGBxu0oGrWDWqTBnS92IglJLpIWbzsx07mud2YSugv6PqY6

export const writeClient = createClient({
    projectId: "t7gl08z7",
    dataset: "production",
    useCdn: false,
    apiVersion: "2022-03-07",
    token: "skJrSKAbSidzw5NQ7NMIl2Oy9hDKiqZ8nPCzPuj5S5EMtVpmFDl0s7Y3xIMhCJCa4WZBYnc9lOIZKtfITejtetRYKnw13NklPUspgiA0c89JG7ORnCmDccdJAx5BPLqckU3CXyGBxu0oGrWDWqTBnS92IglJLpIWbzsx07mud2YSugv6PqY6"
})