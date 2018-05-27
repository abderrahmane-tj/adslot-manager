export const AD_TYPE = Object.freeze({
  WEB: 1,
  APP: 2,
  AUDIO: 3,
  VIDEO: 4,
});

export const API_URL = process.env.REACT_APP_API_URL;

// the use of ALL (--all--) as the first option value is a temporary fix,
// for a bug in Semantic-UI Dropdown

export const ALL = '--all--';
export const NONE = '--none--';

export const TYPE_OPTIONS = [
  {text: 'Web', value: AD_TYPE.WEB},
  {text: 'App', value: AD_TYPE.APP},
  {text: 'Audio', value: AD_TYPE.AUDIO},
  {text: 'Video', value: AD_TYPE.VIDEO},
];