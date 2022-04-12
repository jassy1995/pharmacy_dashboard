export const sectors = [
  { value: '61', text: 'Agriculture' },
  { value: '11', text: 'Banking' },
  { value: '29', text: 'Business Owner / Enterprenuer' },
  { value: '31', text: 'Civil Servant' },
  { value: '43', text: 'Construction' },
  { value: '48', text: 'Education' },
  { value: '65', text: 'Energy' },
  { value: '59', text: 'Financial Services' },
  { value: '60', text: 'FMCG' },
  { value: '46', text: 'Franchising' },
  { value: '44', text: 'Gambling' },
  { value: '69', text: 'General Commerce' },
  { value: '12', text: 'Government' },
  { value: '52', text: 'Healthcare' },
  { value: '50', text: 'Hospitality / Tourism' },
  { value: '14', text: 'Information Technology' },
  { value: '58', text: 'Insurance' },
  { value: '30', text: 'Legal Services' },
  { value: '51', text: 'Mass Media' },
  { value: '64', text: 'Mining & Quarying' },
  { value: '71', text: 'Non Governmental Organization(NGOs)' },
  { value: '35', text: 'Others' },
  { value: '49', text: 'Pharmaceuticals' },
  { value: '34', text: 'Principal / Head Teacher' },
  { value: '32', text: 'Public Servant' },
  { value: '68', text: 'Public Utilities' },
  { value: '47', text: 'Real Estate' },
  { value: '70', text: 'Religious Organization' },
  { value: '45', text: 'Retail Sales' },
  { value: '33', text: 'Teacher' },
  { value: '13', text: 'Telecommunications' },
  { value: '63', text: 'Tourism' },
  { value: '62', text: 'Transport & Logistics' },
  { value: '55', text: 'Waste Disposal' }
];

export const maritalStatus = [
  { value: '1', text: 'Single' },
  { value: '2', text: 'Married' },
  { value: '3', text: 'Divorced' },
  { value: '4', text: 'Widowed' },
  { value: '5', text: 'Separated' },
  { value: '6', text: 'Civil Union' },
  { value: '7', text: 'Domestic Partnership' }
];

export const relationships = [
  { text: 'Spouse', value: 'spouse' },
  { text: 'Sibling', value: 'sibling' },
  { text: 'Child', value: 'child' },
  { text: 'Relative', value: 'relative' },
  { text: 'Friend', value: 'friend' },
];

export const months = [
  { value: '1', text: 'January' },
  { value: '2', text: 'February' },
  { value: '3', text: 'March' },
  { value: '4', text: 'April' },
  { value: '5', text: 'May' },
  { value: '6', text: 'June' },
  { value: '7', text: 'July' },
  { value: '8', text: 'August' },
  { value: '9', text: 'September' },
  { value: '10', text: 'October' },
  { value: '11', text: 'November' },
  { value: '12', text: 'December' }
];

export const occupations = [
  { value: '1', text: 'Employed' },
  { value: '4', text: 'Employer' },
  { value: '2', text: 'Entrepreneur' },
  { value: '20', text: 'Retired' },
  { value: '5', text: 'Self Employed' },
  { value: '3', text: 'Student' },
  { value: '7', text: 'Unemployed' }
];

export const tenors = (new Array(12)).fill(null).map((_, i) => ({
  text: `${ i + 1 } month${ i > 1 ? 's' : '' }`,
  value: i + 1
}));

export const years = new Array(80).fill(null).map((_, i) => {
  const year = `${ (new Date()).getFullYear() - i }`;
  return { value: year, text: year };
});

export const residenceTypes = [
  { text: 'Owned', value: '1' },
  { text: 'Rented', value: '2' }
];

export const businessTypes = [
  'Home', 'Rented shop', 'Owned shop', 'Shared shop', 'Owned office', 'Rented office', 'Shared office', 'Others'
].map((t, i) => ({
  text: t, value: i + 1
}));

export const identityTypes = [
  { text: 'International Passport', value: 1 },
  { text: 'National ID Card', value: 2 },
  { text: 'Voters Card', value: 3 },
  { text: 'Drivers License', value: 6 },
  { text: 'Work ID', value: 4 },
  { text: 'School ID', value: 5 }
];
