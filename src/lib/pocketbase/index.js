// pb docs: https://github.com/pocketbase/js-sdk
import PocketBase from 'pocketbase';

// connect to pb instance
const url = 'https://aecdemo.pockethost.io/'
const client = new PocketBase(url)

// store data
const tags = await client.collection('tags').getFullList();
const links = await client.collection('links').getFullList();
const media = await client.collection('media').getFullList();
const industries = await client.collection('industries').getFullList();
const engagements = await client.collection('engagements').getFullList({
  expand: 'industry,media,links,tags'
});

// export results
export const results = {
  tags,
  links,
  media,
  industries,
  engagements
}