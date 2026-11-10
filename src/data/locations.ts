export interface NigerianState {
  name: string;
  code: string;
  popularCities: string[];
  majorAreas: Record<string, string[]>;
}

export const NIGERIAN_LOCATIONS: NigerianState[] = [
  {
    name: 'Lagos',
    code: 'LA',
    popularCities: ['Ikeja', 'Lekki', 'Victoria Island', 'Ikoyi', 'Yaba', 'Surulere', 'Alaba', 'Oshodi', 'Magodo', 'Ajah', 'Ikorodu'],
    majorAreas: {
      'Ikeja': ['Computer Village', 'Allen Avenue', 'Opebi', 'GRA Ikeja', 'Alausa'],
      'Lekki': ['Lekki Phase 1', 'Chevron Drive', 'Agungi', 'Jakande', 'Ikate Elegushi'],
      'Victoria Island': ['Adeola Odeku', 'Ahmadu Bello Way', 'Kofo Abayomi', 'Sanusi Fafunwa'],
      'Ikoyi': ['Banana Island', 'Parkview Estate', 'Old Ikoyi', 'Osborne Foreshore'],
      'Yaba': ['Sabo', 'Akoka', 'Commercial Avenue', 'Tejuosho Market', 'Jibowu'],
      'Surulere': ['Adeniran Ogunsanya', 'Bode Thomas', 'Masha', 'Ojuelegba', 'National Stadium']
    }
  },
  {
    name: 'Abuja (FCT)',
    code: 'FC',
    popularCities: ['Wuse', 'Maitama', 'Garki', 'Jabi', 'Gwarinpa', 'Asokoro', 'Apo', 'Lugbe'],
    majorAreas: {
      'Wuse': ['Wuse 2', 'Wuse Zone 4', 'Wuse Zone 5', 'Wuse Zone 6'],
      'Maitama': ['Gana Street', 'Maitama Extension', 'Aguiyi Ironsi'],
      'Garki': ['Garki 2', 'Area 1', 'Area 10', 'Area 11'],
      'Jabi': ['Jabi Lake', 'Utako Market Axis', 'Jabi District'],
      'Gwarinpa': ['1st Avenue', '3rd Avenue', 'Federal Housing Estate']
    }
  },
  {
    name: 'Rivers',
    code: 'RI',
    popularCities: ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Oyigbo', 'Choba'],
    majorAreas: {
      'Port Harcourt': ['Old GRA', 'GRA Phase 2', 'Trans-Amadi', 'Peter Odili Road', 'D-Line', 'Aba Road'],
      'Obio-Akpor': ['Rumuokoro', 'Rumuola', 'Woji', 'Eliozu']
    }
  },
  {
    name: 'Oyo',
    code: 'OY',
    popularCities: ['Ibadan', 'Ogbomosho', 'Oyo Town'],
    majorAreas: {
      'Ibadan': ['Bodija', 'Dugbe', 'Ring Road', 'Jericho', 'Oluyole Estate', 'Samonda', 'Iwo Road']
    }
  },
  {
    name: 'Edo',
    code: 'ED',
    popularCities: ['Benin City', 'Auchi', 'Ekpoma'],
    majorAreas: {
      'Benin City': ['GRA', 'Airport Road', 'Uselu', 'Ring Road', 'Sapele Road', 'Ekenwan Road']
    }
  },
  {
    name: 'Enugu',
    code: 'EN',
    popularCities: ['Enugu Urban', 'Nsukka', 'Agbani'],
    majorAreas: {
      'Enugu Urban': ['Independence Layout', 'New Haven', 'GRA Enugu', 'Abakpa Nike', 'Ogui Road']
    }
  },
  {
    name: 'Kano',
    code: 'KN',
    popularCities: ['Kano Municipal', 'Nassarawa', 'Fagge', 'Dala'],
    majorAreas: {
      'Kano Municipal': ['Sabon Gari', 'Bompai', 'Nassarawa GRA', 'Kano City Center']
    }
  },
  {
    name: 'Kaduna',
    code: 'KD',
    popularCities: ['Kaduna North', 'Kaduna South', 'Zaria', 'Kafanchan'],
    majorAreas: {
      'Kaduna North': ['Barnawa', 'Malali', 'Ungwan Rimi', 'Ali Akilu Road']
    }
  },
  {
    name: 'Delta',
    code: 'DE',
    popularCities: ['Warri', 'Asaba', 'Ughelli', 'Sapele'],
    majorAreas: {
      'Warri': ['Effurun', 'GRA Warri', 'Airport Road', 'Enerhen'],
      'Asaba': ['Okpanam Road', 'Nnebisi Road', 'GRA Asaba', 'Summit Junction']
    }
  },
  {
    name: 'Anambra',
    code: 'AN',
    popularCities: ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia'],
    majorAreas: {
      'Awka': ['Ifite Awka', 'GRA Awka', 'Ziks Avenue'],
      'Onitsha': ['Main Market', 'Fegge', 'Ochanja', 'Upper Iweka']
    }
  },
  {
    name: 'Ogun',
    code: 'OG',
    popularCities: ['Abeokuta', 'Ota', 'Sagamu', 'Ijebu-Ode'],
    majorAreas: {
      'Abeokuta': ['Ibara', 'Oke-Mosan', 'Kuto', 'Asero']
    }
  }
];

export const POPULAR_LOCATIONS = [
  'All Nigeria',
  'Lagos',
  'Abuja (FCT)',
  'Port Harcourt, Rivers',
  'Ibadan, Oyo',
  'Benin City, Edo',
  'Enugu',
  'Kano',
  'Asaba / Warri, Delta'
];
