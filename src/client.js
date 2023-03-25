// import { createClient } from 'next-sanity'
import { createClient } from '@sanity/client'
import createImageUrlBuilder from '@sanity/image-url'


export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nmoloqwu",
    apiVersion: '2022-03-23',
    // token: process.env.SANITY_API_TOKEN,
    token: 'skd1w0gNpF7NLAGxKY3kdbvyewkN29afGel0d70Ht1Wdfj4JUXnVfGjFSa5MoqP5m6hx5UIP3eliAy4kyodtEfVSnz98dMjRLmCUst5lCJLrKCCLAxX6TLuZ0dVISgaCdHUCYQ5JEYGboYHXAwbGZLfmq2v3kJsUn0uGfOeJMaNZSXziPqxC',
    useCdn: process.env.NODE_ENV === 'production',

}
export const client = createClient(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)