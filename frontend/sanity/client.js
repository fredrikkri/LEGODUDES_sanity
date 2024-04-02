import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: "t7gl08z7",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-03-07"
})