import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import {books, authors} from '../config/mongoCollections.js';
import {v4 as uuid} from 'uuid';

let authList = [
  {
    _id: '2155574a-80b0-4389-8bb3-3240da52b770',
    first_name: 'Mayer',
    last_name: 'Staddart',
    date_of_birth: '6/30/1913',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: []
  },
  {
    _id: '69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd',
    first_name: 'Madelaine',
    last_name: 'Armatage',
    date_of_birth: '4/13/1972',
    hometownCity: 'Pasadena',
    hometownState: 'CA',
    books: [
      '60a172b9-33fa-4ced-a210-528c723b27de',
      'ade687ed-1ee8-4ee7-bf14-485810f2af16'
    ]
  },
  {
    _id: '4ac1276b-9471-4c52-a138-182746b8b89d',
    first_name: 'Adorne',
    last_name: 'Briant',
    date_of_birth: '6/13/1937',
    hometownCity: 'Corpus Christi',
    hometownState: 'TX',
    books: ['d14228c6-ce24-4edd-887e-d661dd0832b3']
  },
  {
    _id: 'd6caf59c-f74c-415a-a5c7-d80ecafd1c0b',
    first_name: 'Huberto',
    last_name: 'Kleinmintz',
    date_of_birth: '4/27/1984',
    hometownCity: 'Fort Pierce',
    hometownState: 'FL',
    books: [
      '55bd691d-075f-4691-b4b7-3a77794c6335',
      'dd594b3b-43a0-4a71-8e7e-8fdab17d8ad9',
      '6ab1a72a-b93b-40fd-89df-10fcf8c9e2bd',
      'c8628b06-4fbf-4437-af28-f6eb5ac058a4'
    ]
  },
  {
    _id: '6f4b066f-ca50-4ca9-9dd2-5f8ab9c75550',
    first_name: 'Angelia',
    last_name: 'Basterfield',
    date_of_birth: '6/8/1903',
    hometownCity: 'Juneau',
    hometownState: 'AK',
    books: [
      'd4589b40-ef17-4ec1-9f1e-3fcba90deefe',
      '90c63a0b-c366-4d32-b471-6590b645e547',
      'a531ccda-6d77-4170-9a6a-aa3eda65fa78'
    ]
  },
  {
    _id: '2579080f-eb74-4ed3-8167-2e376841407c',
    first_name: 'Leigh',
    last_name: 'Arnett',
    date_of_birth: '12/25/1951',
    hometownCity: 'Jamaica',
    hometownState: 'NY',
    books: [
      '0da9e366-381e-47a1-b597-9df4c91ea5f0',
      'e5fe1c3c-446b-4e2a-93c0-1a2e478dc8d6',
      'da45609d-4e7f-469b-8a61-317d80bb7291',
      '70b1fcf3-869e-49fd-a200-916ff654542a'
    ]
  },
  {
    _id: '259bc2c1-2fcb-44a9-b3a4-ac6ca89a7e2c',
    first_name: 'Bertie',
    last_name: 'Robinett',
    date_of_birth: '1/30/1948',
    hometownCity: 'Long Beach',
    hometownState: 'CA',
    books: ['23de89cf-c91b-4e62-b57d-ad62d6790f46']
  },
  {
    _id: 'd7e14c9d-4648-4797-bc75-99c29f5bebe3',
    first_name: 'Lisetta',
    last_name: 'Babalola',
    date_of_birth: '9/8/1970',
    hometownCity: 'Pasadena',
    hometownState: 'CA',
    books: [
      'fc699023-564c-47fd-b6ca-1facf7a39a33',
      'd88d177d-cdbe-4dd4-ab26-9e629f5decf1'
    ]
  },
  {
    _id: 'e465ba22-78a0-473a-aa6e-4dc28a031fbf',
    first_name: 'Reeva',
    last_name: 'Turfitt',
    date_of_birth: '1/22/1933',
    hometownCity: 'Tacoma',
    hometownState: 'WA',
    books: [
      'e803d28e-920b-468c-9730-fb19974f2cb5',
      '5188d1cd-1989-4e7a-a3c0-4a588a812659',
      'bf1bbeb9-ee11-42f2-bbec-a8bc2bbd7269'
    ]
  },
  {
    _id: 'c12eb14f-1e38-4ed2-a200-2900f7b6ccad',
    first_name: 'Clarance',
    last_name: 'Aleso',
    date_of_birth: '5/26/1972',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: [
      '1a5cad0d-345a-4958-8201-09c255d9e044',
      '6c06e608-b73c-4ddb-91d6-f49efbb8856b',
      '60d20fc7-df97-44b7-ae8e-4c8928694c70'
    ]
  },
  {
    _id: 'c5be006b-81f0-465f-9abf-d337d1f4c7b8',
    first_name: 'Brady',
    last_name: 'Fosdike',
    date_of_birth: '11/19/1932',
    hometownCity: 'Reno',
    hometownState: 'NV',
    books: []
  },
  {
    _id: 'a7da4a33-75a6-4059-83a6-493c1117fce2',
    first_name: 'Venita',
    last_name: 'Jorck',
    date_of_birth: '12/12/1978',
    hometownCity: 'Jacksonville',
    hometownState: 'FL',
    books: [
      '0afd30e8-b6c9-46be-b5d2-3c0678a989e3',
      'd00c78a7-1de8-4a9c-8342-6a92fe872706'
    ]
  },
  {
    _id: 'a0e45f04-ca38-4d40-b5ed-d951d3c82712',
    first_name: 'Roxine',
    last_name: 'Grundle',
    date_of_birth: '5/27/1943',
    hometownCity: 'Spokane',
    hometownState: 'WA',
    books: [
      '8d555b93-ccc9-4d51-b6a2-95b03775ca40',
      '2a75552e-c65f-47fe-84fa-104ff8c22657',
      '0e1c04cd-54a1-4b77-b70f-617a871f9b05'
    ]
  },
  {
    _id: '96ba8dcc-2e8e-4e6a-86ab-b2bd370c9324',
    first_name: 'Daniel',
    last_name: 'Armitt',
    date_of_birth: '12/9/1919',
    hometownCity: 'Las Vegas',
    hometownState: 'NV',
    books: [
      '82c2903c-d0b5-4ec0-8a46-38485d65b93d',
      '9b270c80-aaeb-44b6-a383-a31e7fc0cf97'
    ]
  },
  {
    _id: '2bad735a-d92f-4497-bb53-8f2aef878257',
    first_name: 'Audra',
    last_name: 'Purse',
    date_of_birth: '5/24/1913',
    hometownCity: 'Santa Clara',
    hometownState: 'CA',
    books: [
      'b829e1a8-1c7f-4f11-a6c3-6e9769f2c54b',
      'c006b0bd-f8d4-40ac-b083-d6071d537cf6'
    ]
  },
  {
    _id: 'e55d71ed-c99c-4e2d-80f9-8f4633a8e635',
    first_name: 'Matthaeus',
    last_name: 'Copcott',
    date_of_birth: '3/15/1923',
    hometownCity: 'Saint Paul',
    hometownState: 'MN',
    books: ['24eb2bee-fc3e-44d0-9f52-00f2172c3534']
  },
  {
    _id: '8baedb8e-4a69-4f01-82b3-0b4374d74ad4',
    first_name: 'Janine',
    last_name: 'Beardsell',
    date_of_birth: '5/6/2001',
    hometownCity: 'Philadelphia',
    hometownState: 'PA',
    books: [
      'dfa082b7-b5ca-4e8c-b2c7-612f04156441',
      'f4fb9201-2030-4bd5-9cf5-57aa2e506e1d',
      '55819fc3-50e6-4f8a-97c9-fd4c7ad5ec09'
    ]
  },
  {
    _id: 'd7b5a558-a8ce-4aed-95b4-f9a92f663fb7',
    first_name: 'Pavlov',
    last_name: 'Bauchop',
    date_of_birth: '7/12/1958',
    hometownCity: 'Colorado Springs',
    hometownState: 'CO',
    books: [
      '990cf55d-8ccd-4c38-a0b2-e5cba3f87e87',
      '34b190b7-cd45-4575-a97c-02c44dac14c6'
    ]
  },
  {
    _id: '6b1e71e7-722e-491c-a559-c2eb3d8b0b83',
    first_name: 'Dud',
    last_name: 'Peerless',
    date_of_birth: '6/29/1967',
    hometownCity: 'Houston',
    hometownState: 'TX',
    books: []
  },
  {
    _id: '051a48a8-f65f-465a-bb09-53ec58b4ef43',
    first_name: 'Gustave',
    last_name: 'Wickling',
    date_of_birth: '5/8/1932',
    hometownCity: 'Corona',
    hometownState: 'CA',
    books: [
      '971b9a9b-a706-4b0c-8a87-dda3e9146ead',
      '8bfee834-dd66-439a-9c80-3f0863f97d02'
    ]
  },
  {
    _id: '42a68549-69e8-48f7-8f49-b4a4e3914ace',
    first_name: 'Curry',
    last_name: 'Munsey',
    date_of_birth: '4/24/1954',
    hometownCity: 'Salt Lake City',
    hometownState: 'UT',
    books: ['e41a4983-ffc2-46d6-86fd-1bc9ebfd54f9']
  },
  {
    _id: '5041f8dd-3257-4272-b69b-e417c7fc72b0',
    first_name: 'Gustaf',
    last_name: 'Cargill',
    date_of_birth: '3/15/1926',
    hometownCity: 'Saginaw',
    hometownState: 'MI',
    books: []
  },
  {
    _id: 'ec940e39-f0cb-4629-a9fd-ba91873a006b',
    first_name: 'Aldous',
    last_name: 'Addess',
    date_of_birth: '5/25/1927',
    hometownCity: 'Baton Rouge',
    hometownState: 'LA',
    books: ['17b4af73-dc3f-4f96-8350-05a45200253d']
  },
  {
    _id: 'e3cd6df6-103e-4108-bc96-e0d39bd0713f',
    first_name: 'Sholom',
    last_name: 'Rawcliff',
    date_of_birth: '8/21/1963',
    hometownCity: 'Lansing',
    hometownState: 'MI',
    books: [
      'b99fc6a0-ad68-48bd-a64b-8cf0ffee79ad',
      'cc040b93-3329-430a-a744-e7d673b35688',
      '3d3a405b-2d8d-4b96-a34d-242d82d85dfc',
      '99bea1c7-82fe-4c4a-87a9-ca16cf76f620',
      'ba3be617-3ff6-4a96-8da1-81396e485e7e'
    ]
  },
  {
    _id: '3e877cfc-89d2-426f-9f9c-b369a04eb4c7',
    first_name: 'Amabel',
    last_name: 'Ghidoni',
    date_of_birth: '2/3/1917',
    hometownCity: 'Denver',
    hometownState: 'CO',
    books: [
      '6b77352d-d818-4b27-8541-3dd247de4f3d',
      'd7a8fda5-056b-49fb-b6ce-8a83481da37a',
      '82fc5b77-991b-4b4c-a7d5-665ba03a2269',
      '8436cffe-c898-49a4-9f8a-fab26720fb52'
    ]
  },
  {
    _id: 'c041d756-40a0-4146-a219-bda3216a7615',
    first_name: 'Clarie',
    last_name: 'Khalid',
    date_of_birth: '1/31/1967',
    hometownCity: 'Phoenix',
    hometownState: 'AZ',
    books: [
      '2125428e-f750-473b-9363-73550f31ab12',
      '845b508f-3482-4b6f-ad75-56c55cdcea40'
    ]
  },
  {
    _id: '1fdccafd-71f6-43f4-bd87-32164f1441a9',
    first_name: 'Lisette',
    last_name: 'Laurisch',
    date_of_birth: '4/7/1973',
    hometownCity: 'Shreveport',
    hometownState: 'LA',
    books: [
      '638686c2-e098-4d5f-860b-78b31a4ccc9d',
      '20237537-787f-425c-b690-b68ef2373f5a'
    ]
  },
  {
    _id: '82a3acb2-dd18-4e47-818a-eaeb0e769b69',
    first_name: 'Clemente',
    last_name: 'Bean',
    date_of_birth: '5/11/1919',
    hometownCity: 'Pocatello',
    hometownState: 'ID',
    books: ['17d0168b-980e-409d-a81f-f169989291f7']
  },
  {
    _id: '56869ebf-d3b9-4356-95e2-4c3ca80cb191',
    first_name: 'Danny',
    last_name: 'Oliphand',
    date_of_birth: '4/26/1978',
    hometownCity: 'Manassas',
    hometownState: 'VA',
    books: [
      '7b8a1f89-4ac8-45de-bc6e-bcf8b5d30484',
      'f9ca9eae-3267-4e6c-8c0b-b65653907d52'
    ]
  },
  {
    _id: '1871e6d7-551f-41cb-9a07-08240b86c95c',
    first_name: 'Derward',
    last_name: 'Ticic',
    date_of_birth: '6/3/1932',
    hometownCity: 'Garden Grove',
    hometownState: 'CA',
    books: ['4efdb199-5a0f-4410-bded-ce07990c6aa4']
  },
  {
    _id: '3e0a8487-426a-4866-85bc-33db5cad2ad0',
    first_name: 'Ashlie',
    last_name: 'McIlhagga',
    date_of_birth: '6/21/1926',
    hometownCity: 'Columbus',
    hometownState: 'MS',
    books: [
      '38a628e5-8f0a-4d7c-8152-a6004d025b11',
      '8beaa0c5-bd83-452a-a984-836eb3839b37'
    ]
  },
  {
    _id: 'f88250fb-7c0c-434d-bf18-4b83e7452c60',
    first_name: 'Hussein',
    last_name: 'Axell',
    date_of_birth: '4/4/1902',
    hometownCity: 'Augusta',
    hometownState: 'GA',
    books: ['0c2a1464-6b68-4796-9f78-6209d0fccc00']
  },
  {
    _id: 'b546af17-401e-41f4-9b0b-bbfdd1ffd490',
    first_name: 'Tully',
    last_name: 'Gronaller',
    date_of_birth: '6/26/1918',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: []
  },
  {
    _id: '2d569bc9-7c5a-4e2a-a747-4cdc02685600',
    first_name: 'Maurice',
    last_name: 'McKinless',
    date_of_birth: '11/29/1923',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: ['05eafc89-7924-4020-9ddd-7b42c09a91d8']
  },
  {
    _id: '3627cb4e-dd06-4fca-8b53-5615d191a8b0',
    first_name: 'Pancho',
    last_name: 'Barradell',
    date_of_birth: '10/12/1910',
    hometownCity: 'Fort Worth',
    hometownState: 'TX',
    books: ['72931a63-011f-4501-80b2-7525a5d35eef']
  },
  {
    _id: '882035d5-5704-4d83-8268-013f14bbbb35',
    first_name: 'Constantia',
    last_name: 'Larmouth',
    date_of_birth: '1/1/1944',
    hometownCity: 'Bradenton',
    hometownState: 'FL',
    books: [
      '8f11a24a-c0d9-4974-998f-3c8394ebf2ca',
      '25977000-3830-4bb9-8cbc-43775696d33c',
      '6c779339-2983-4b99-95b2-16ed2ca94de9'
    ]
  },
  {
    _id: '27025bc3-36b0-4268-a346-e985f74cab78',
    first_name: 'Godfrey',
    last_name: 'Emett',
    date_of_birth: '6/21/1953',
    hometownCity: 'Fresno',
    hometownState: 'CA',
    books: [
      '3f0b8092-23a8-41db-888c-1a0f383d5c33',
      '343787eb-5819-4804-8451-840163cbfca4',
      '622ae74a-9018-42c9-a71f-1759b2f3501e'
    ]
  },
  {
    _id: 'a1c3fc06-4b6c-42f9-9059-41273a7ba4f2',
    first_name: 'Ted',
    last_name: 'Carruth',
    date_of_birth: '10/14/2003',
    hometownCity: 'Warren',
    hometownState: 'OH',
    books: [
      'c7a8512b-548b-4196-9b78-33445769e247',
      '84d94a06-2e57-457b-b513-863eeb47de8e'
    ]
  },
  {
    _id: '51ed9aae-7fa8-4e76-b9fa-79d41b185188',
    first_name: 'Markus',
    last_name: 'Molden',
    date_of_birth: '11/21/1966',
    hometownCity: 'Aiken',
    hometownState: 'SC',
    books: ['4a8e8235-2bd4-4d38-938c-e05dc29b84f8']
  },
  {
    _id: '569d368d-46ef-43d9-aada-b17e655a509f',
    first_name: 'Horacio',
    last_name: 'Bourbon',
    date_of_birth: '3/28/2005',
    hometownCity: 'Rochester',
    hometownState: 'NY',
    books: [
      'df4dc3f8-a6ae-448e-a469-ac2b488b921c',
      'e2b7a3a2-e4f6-4a6e-bfc8-da41d3409265',
      'd374d981-b15b-4fdb-bd83-d54056617fc7',
      '45c4ec62-751e-43da-9ba1-0f3f207aed46',
      '0c358a93-dc57-49aa-ac8c-a3b3fde195e3'
    ]
  },
  {
    _id: '44146811-c29c-44a3-a186-010f7b5d9376',
    first_name: 'Kirsten',
    last_name: 'Prosh',
    date_of_birth: '10/18/1958',
    hometownCity: 'Gainesville',
    hometownState: 'GA',
    books: [
      '1561a24b-87d7-4ddc-b7c0-8b113958fcd1',
      'b3fd8c86-6521-4563-8b5c-3a1e3d446149',
      'bf4ab8e9-118d-49af-83d8-55e4e8835d62',
      '0a6935a0-ba82-4016-986e-82c15d4b1192'
    ]
  },
  {
    _id: '726687ee-c728-4022-818e-0fb9384d4ed6',
    first_name: 'Hoebart',
    last_name: 'Rameaux',
    date_of_birth: '6/25/1991',
    hometownCity: 'Seminole',
    hometownState: 'FL',
    books: ['a627470f-6c65-4137-8783-b0f88ac6a419']
  },
  {
    _id: '1dd95e98-1d70-420f-8839-12cfbbd33709',
    first_name: 'Loree',
    last_name: 'Tomasutti',
    date_of_birth: '11/8/1947',
    hometownCity: 'Las Vegas',
    hometownState: 'NV',
    books: ['ed1f43af-06c1-4d5c-a855-769fc88094a6']
  },
  {
    _id: '3fe6ba2c-45af-4c96-a607-91aa273eb41b',
    first_name: 'Immanuel',
    last_name: 'Rumgay',
    date_of_birth: '11/6/1991',
    hometownCity: 'San Francisco',
    hometownState: 'CA',
    books: [
      '62371918-4fe4-4bc9-8c59-99a4e640aad1',
      '3322696a-6e01-4ddf-8304-28781d86de29'
    ]
  },
  {
    _id: '33954968-0cf9-49c3-920a-139cc8c5e497',
    first_name: 'Douglass',
    last_name: 'Stave',
    date_of_birth: '3/14/1931',
    hometownCity: 'Indianapolis',
    hometownState: 'IN',
    books: [
      '415c874c-1472-4551-a1c0-6f3d88f353c7',
      '0dd20ca1-3754-4d4c-9b3b-152882fbceb4'
    ]
  },
  {
    _id: '0a9bb222-8790-47b0-91b6-95730bd7bb19',
    first_name: 'Avictor',
    last_name: 'Scawton',
    date_of_birth: '9/11/1995',
    hometownCity: 'Syracuse',
    hometownState: 'NY',
    books: ['3c2d2bcd-66a8-49e0-a7e3-2cbed2a34efa']
  },
  {
    _id: '1e47b471-5a20-467a-9f06-3b3d77a790b7',
    first_name: 'Daffi',
    last_name: 'Autin',
    date_of_birth: '10/18/1911',
    hometownCity: 'Sacramento',
    hometownState: 'CA',
    books: ['f5470eaf-6686-4adf-a1be-e7f6281e0220']
  },
  {
    _id: '789c581a-3e2c-4880-ba97-a739ac4ed841',
    first_name: 'Elliot',
    last_name: 'Cream',
    date_of_birth: '3/28/2001',
    hometownCity: 'Columbus',
    hometownState: 'OH',
    books: [
      '4ed9bedb-ce73-4c2d-9184-39561ee33b19',
      '33bffc52-855f-4389-9158-2c185c5c2999'
    ]
  },
  {
    _id: '83133959-f0e4-47b0-beba-7f7b1cd71a24',
    first_name: 'Collie',
    last_name: 'Lyst',
    date_of_birth: '3/22/1940',
    hometownCity: 'Anaheim',
    hometownState: 'CA',
    books: [
      '2a757419-09f7-4314-aac5-424c2a984e9c',
      '4ff8fcdc-51e4-4629-9dae-58f10f6d9a36'
    ]
  },
  {
    _id: '01b8cdbd-dc58-42c2-8b17-a5f5d7e635a5',
    first_name: 'Meriel',
    last_name: 'Lindores',
    date_of_birth: '8/2/1925',
    hometownCity: 'Marietta',
    hometownState: 'GA',
    books: ['1a195794-45e8-4440-8f46-1286b3698c38']
  },
  {
    _id: '4ecb2ba5-45ad-4d90-801f-cba7ba5fd095',
    first_name: 'Stesha',
    last_name: 'Enoksson',
    date_of_birth: '4/12/1976',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: [
      '01fd608f-290f-4ffc-8b2f-9ff2820aa5a4',
      '270208f6-a947-427c-8017-0bbf961a28f5',
      'c91fbf18-fe6c-4700-b560-cc245b7b44ea'
    ]
  },
  {
    _id: '45a36ffa-56fd-4366-8d5a-2e685b286702',
    first_name: 'Tasha',
    last_name: 'Dacks',
    date_of_birth: '11/26/1905',
    hometownCity: 'Largo',
    hometownState: 'FL',
    books: ['85dea13e-fd28-44f0-8f43-ecdeedfe9df5']
  },
  {
    _id: 'fe943a18-1ea9-49ed-a5cd-30967dd95bd2',
    first_name: 'Yetta',
    last_name: 'Hazelgrove',
    date_of_birth: '8/5/1906',
    hometownCity: 'Waltham',
    hometownState: 'MA',
    books: [
      'd8aad97c-50e5-45e8-bb4e-0fdf6439c580',
      '7780b9c9-118a-4ef6-a228-e7415cfeb35e',
      'bea5c80e-4657-45b3-81b6-dec85c24d9b2',
      'c0a33800-8205-4ac5-9aa8-b8c4e2cc1768',
      'b973a821-749a-4a4a-92fc-237372132f94',
      '034ab888-b467-46a0-a72f-c0530c1fe347'
    ]
  },
  {
    _id: '9ecc533b-d3bd-4812-8f64-12c7cc1404b1',
    first_name: 'Alfreda',
    last_name: 'Thelwll',
    date_of_birth: '8/5/1903',
    hometownCity: 'Newark',
    hometownState: 'DE',
    books: [
      'ea762e44-9d4c-40cf-87a6-0935e1027246',
      '705ed494-6e03-44fb-995f-0fcc4737b0cd'
    ]
  },
  {
    _id: '19fcdd32-aa73-4585-ade7-9cbf34ee4958',
    first_name: 'Berky',
    last_name: 'Lawrence',
    date_of_birth: '8/12/1933',
    hometownCity: 'Richmond',
    hometownState: 'VA',
    books: [
      '8717082f-cde3-4407-8ed9-a3017ce2136a',
      'bbf1115b-9b87-4acc-8f42-42865e3393ca'
    ]
  },
  {
    _id: '76ade80d-1b0e-49ef-8e20-a1d2b193bb06',
    first_name: 'Kipp',
    last_name: 'Oxnam',
    date_of_birth: '8/4/1917',
    hometownCity: 'Oklahoma City',
    hometownState: 'OK',
    books: [
      'bccb514c-defe-4a67-94a8-5070dc45056b',
      '3bc9a7cf-7ceb-4914-a850-852833ae706d',
      '53041540-97b8-44d9-b65f-43ea8f061fac'
    ]
  },
  {
    _id: 'e258bb2e-5ac3-42d8-8a56-76b681dff893',
    first_name: 'Willyt',
    last_name: "O'Flannery",
    date_of_birth: '10/30/1943',
    hometownCity: 'College Station',
    hometownState: 'TX',
    books: [
      '9a8d5d1d-09db-4ec3-aaa0-7a8605fecfe3',
      '6c333f44-4d09-40a9-839c-f7e3fb540fe1'
    ]
  },
  {
    _id: '92b9cab7-48d9-4183-8469-4669431fc132',
    first_name: 'Marthe',
    last_name: 'Dunsford',
    date_of_birth: '8/27/1984',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: ['dd700b32-83d0-4474-8779-b3e82302612b']
  },
  {
    _id: 'ba5fb3bd-840b-4590-8176-6e1ec29ff1f7',
    first_name: 'Joycelin',
    last_name: 'Merali',
    date_of_birth: '10/7/1987',
    hometownCity: 'Memphis',
    hometownState: 'TN',
    books: [
      '76ef051b-97ae-410e-a685-6a018acdb75d',
      'f17cb91e-1f40-4441-8373-781e639b5a68',
      'a7d6c28b-7d7a-449d-81dc-2eaabccf0447',
      '340adaf1-5ec4-494c-b5d6-8a5a540b2aba'
    ]
  },
  {
    _id: 'f64a7965-962f-4085-a8f2-ff735c695fa1',
    first_name: 'Reuben',
    last_name: 'Stickels',
    date_of_birth: '12/15/1948',
    hometownCity: 'Birmingham',
    hometownState: 'AL',
    books: [
      '9ea79382-9cc5-4c81-b499-5217afd345f7',
      'e434751e-20cf-402c-b5bc-69f82f35518e',
      'a4f782e4-5b27-4cef-bbac-0b7fab12832a'
    ]
  },
  {
    _id: '83ce2367-949a-41ad-956b-5640a290c63a',
    first_name: 'Frederich',
    last_name: 'Irnis',
    date_of_birth: '7/12/1912',
    hometownCity: 'Vero Beach',
    hometownState: 'FL',
    books: [
      '8ea3e55b-5687-4565-8381-428b8aa12853',
      'e03ca6cc-0402-4b33-91d7-0567786d0be9'
    ]
  },
  {
    _id: '2849bbd5-81c3-48a1-bb3b-91c2dfcf4e46',
    first_name: 'Far',
    last_name: 'Pendreigh',
    date_of_birth: '11/15/1904',
    hometownCity: 'Albuquerque',
    hometownState: 'NM',
    books: [
      '86ad3d6f-46af-495d-8636-751b79ce1c4f',
      'dd533f11-c0a8-45a6-8452-4e93a488a661'
    ]
  },
  {
    _id: '0547b9ff-4a01-465d-ba37-3be4cd542aea',
    first_name: 'Jeffry',
    last_name: 'Chatteris',
    date_of_birth: '10/10/1957',
    hometownCity: 'San Diego',
    hometownState: 'CA',
    books: [
      '7934c26f-b033-4f28-ab49-e6c014203305',
      '411eff1e-2ddf-44a1-b246-3447c1fa8cca'
    ]
  },
  {
    _id: '02c0d1d7-45a5-4429-a0aa-374313af1cc5',
    first_name: 'Aloin',
    last_name: 'Pawelski',
    date_of_birth: '11/1/1982',
    hometownCity: 'Newark',
    hometownState: 'NJ',
    books: [
      '073390e6-eea3-44b7-a72d-c0bd47a11788',
      'fd2b09ac-45a9-408d-b230-d03cffb464be',
      '685d6103-6c5f-4bf4-9747-2c0e9ca4f775',
      '0d22ef11-4463-4a68-85d4-a6b338df70ec'
    ]
  },
  {
    _id: '3b4415d4-91c8-40de-af4b-356072725913',
    first_name: 'Dalt',
    last_name: 'Plumridge',
    date_of_birth: '8/14/1949',
    hometownCity: 'Kansas City',
    hometownState: 'MO',
    books: []
  },
  {
    _id: 'b073ca58-2055-4889-9f0c-0b6d86fee312',
    first_name: 'Grady',
    last_name: 'Wannop',
    date_of_birth: '3/8/2004',
    hometownCity: 'Rockville',
    hometownState: 'MD',
    books: [
      'c0d8abc0-16df-415b-a8ed-a1235b238a27',
      'f92ac365-329e-4914-9288-fca6e0c70106'
    ]
  },
  {
    _id: '8594f194-329c-4248-acf8-81571e2bc9ee',
    first_name: 'Gaynor',
    last_name: "O'Doran",
    date_of_birth: '1/31/1927',
    hometownCity: 'Seattle',
    hometownState: 'WA',
    books: ['de9d079a-659b-4061-b71d-40a15f06fd77']
  },
  {
    _id: '99721619-92e0-44ce-b189-6e09d5d15616',
    first_name: 'Sheilakathryn',
    last_name: 'Luebbert',
    date_of_birth: '11/7/1940',
    hometownCity: 'San Diego',
    hometownState: 'CA',
    books: [
      '256aa91e-b8eb-4dc7-82af-f774df8c7fff',
      '741eb020-6439-4c6d-8461-97d4880e5b07',
      '658f2f74-43b0-47eb-b230-9b022cafd322'
    ]
  },
  {
    _id: 'd37ec8b9-ba37-4202-ac55-0941cccb6f90',
    first_name: 'Harwilll',
    last_name: 'Footitt',
    date_of_birth: '11/28/1958',
    hometownCity: 'Metairie',
    hometownState: 'LA',
    books: ['dc77f3f7-cf50-4126-b225-005b41504ad4']
  },
  {
    _id: 'dacb27a3-b968-4806-b801-d2342c6e964b',
    first_name: 'Abdel',
    last_name: 'Rallin',
    date_of_birth: '7/13/1928',
    hometownCity: 'Alpharetta',
    hometownState: 'GA',
    books: [
      'c24becf6-0017-479b-b1f4-a2afc912c3c4',
      '3988e747-e5c7-496d-a634-70b80d48b961'
    ]
  },
  {
    _id: 'a5866e42-582e-43e8-869f-2291dab11740',
    first_name: 'Vincenz',
    last_name: 'Sangar',
    date_of_birth: '2/9/1950',
    hometownCity: 'Lexington',
    hometownState: 'KY',
    books: [
      'c44ef201-93f9-489c-9618-80ee1e9ca4c9',
      '34e5158c-b9de-40e5-8a6f-35ce3ed604cf',
      'bb6e6c72-9293-4d11-baaa-7e2fefd594c7'
    ]
  },
  {
    _id: '849e6ebc-a060-4ba0-9cae-fd994c819ce9',
    first_name: 'Corbett',
    last_name: 'Caile',
    date_of_birth: '2/5/1917',
    hometownCity: 'Burbank',
    hometownState: 'CA',
    books: []
  },
  {
    _id: 'f857683b-28e8-4371-8103-bf6c32764777',
    first_name: 'Greta',
    last_name: 'Kepp',
    date_of_birth: '8/1/1909',
    hometownCity: 'Van Nuys',
    hometownState: 'CA',
    books: ['491a6cec-89e8-4d31-a94c-99760c8143b6']
  },
  {
    _id: 'd5995759-49a9-411e-8b26-22c3c65eaef7',
    first_name: 'Constantin',
    last_name: 'Lanning',
    date_of_birth: '11/5/1917',
    hometownCity: 'San Francisco',
    hometownState: 'CA',
    books: ['d96ddc0d-e943-44c1-8f81-20dcaab4e70c']
  },
  {
    _id: 'd2198f3f-847e-413d-9775-c97e03a521d3',
    first_name: 'Leonhard',
    last_name: 'Tooher',
    date_of_birth: '9/20/1960',
    hometownCity: 'Honolulu',
    hometownState: 'HI',
    books: [
      '7bb86a46-4ce8-433d-827c-07e6203fe36f',
      '3eaf1246-bb49-4b58-bbdd-58bfd1ffd365',
      '687449fe-4c23-451c-a9e2-00555372c580',
      'bd78cb3f-4ffa-4e4e-b683-d15682f83705'
    ]
  },
  {
    _id: '03bc2e14-c55d-4e31-a183-d1f6ffdc1638',
    first_name: 'Hannie',
    last_name: 'Blofeld',
    date_of_birth: '6/29/1901',
    hometownCity: 'Bozeman',
    hometownState: 'MT',
    books: [
      'b03358e8-e0c3-4121-a4fa-ea2e59c7c7d0',
      'fb4a1732-b261-49df-aa34-0b4a0432a271'
    ]
  },
  {
    _id: '0c6bb74d-5ba1-401f-a80a-373d09e8db8d',
    first_name: 'Elmore',
    last_name: 'Stribbling',
    date_of_birth: '3/31/1970',
    hometownCity: 'Philadelphia',
    hometownState: 'PA',
    books: [
      '1aa1eaa7-cd04-4eed-8462-4d7a47921908',
      '1a4cf6d2-07b6-4ed9-9b44-2694e5f41c2a',
      '8e304f98-c862-458d-aacf-c8ea1bf15592'
    ]
  },
  {
    _id: 'af885c02-71b2-4f3f-b44c-31026713c254',
    first_name: 'Minnie',
    last_name: 'Lamzed',
    date_of_birth: '7/31/1924',
    hometownCity: 'Seattle',
    hometownState: 'WA',
    books: ['18796c97-bd8d-4ab1-ab45-7718b71697aa']
  },
  {
    _id: 'f5131063-5aae-47e7-813b-e7e1d939e551',
    first_name: 'Skippy',
    last_name: 'Imason',
    date_of_birth: '5/30/1998',
    hometownCity: 'San Diego',
    hometownState: 'CA',
    books: [
      '17727a85-81eb-4604-b42b-d208c78274cf',
      '2abf6584-7968-4609-893e-b50be9b09c64'
    ]
  },
  {
    _id: '66ca252a-e957-4050-93df-aa40f49f244e',
    first_name: 'Camel',
    last_name: 'Kreber',
    date_of_birth: '12/21/1981',
    hometownCity: 'Aurora',
    hometownState: 'CO',
    books: ['f607861e-008d-4e01-ba2e-e31eaafb0cd8']
  },
  {
    _id: '7a71d1b2-5ff1-4b47-a861-9c4089c6b768',
    first_name: 'Austen',
    last_name: 'Clynmans',
    date_of_birth: '9/8/1900',
    hometownCity: 'Boston',
    hometownState: 'MA',
    books: [
      'eb32b579-f7d8-4b92-b95b-92138677e2b6',
      '45772165-862d-4e41-ab36-450c9dc7e0e0',
      'f6d1b1c0-ab7a-4cf1-91a7-79439e84c505'
    ]
  },
  {
    _id: '8b4128b2-cf2a-40e2-9130-9899c17853eb',
    first_name: 'Allyce',
    last_name: 'Arnauduc',
    date_of_birth: '10/30/1947',
    hometownCity: 'Rochester',
    hometownState: 'NY',
    books: [
      '82acf469-751d-4ac0-a451-f4be65a288a6',
      '13bbc0aa-7067-486c-a973-755f4e98402b',
      'fc67b542-7d9f-4e4b-bd25-c8d44d2a4af7'
    ]
  },
  {
    _id: '44661fef-082d-421f-b2c0-b6bc3698d4f5',
    first_name: 'Margette',
    last_name: 'Heart',
    date_of_birth: '12/19/2000',
    hometownCity: 'Torrance',
    hometownState: 'CA',
    books: [
      'f878c52b-4b22-42e6-8dcd-209f94e3333a',
      'b3a1d525-5348-45db-af49-c08e01b06b88',
      'fb3d8b83-89e7-4d9b-8a7b-15722b4ef21b',
      '72d4d0cd-dc47-4213-b853-429d14132609'
    ]
  },
  {
    _id: '36f9f627-791c-4476-8a6c-cae6807be704',
    first_name: 'Vincents',
    last_name: 'Sauvage',
    date_of_birth: '5/5/1992',
    hometownCity: 'Houston',
    hometownState: 'TX',
    books: [
      '3f0ee995-e4ea-4d54-ac4e-5d0cd7890132',
      '9495a847-edd0-41e4-bd40-239a8e0de275',
      'c716df46-625a-40de-866d-9c50a8c24a2e',
      'a7939f43-2d24-42c9-afe5-04a64576d833',
      '1e9644af-3079-4642-93aa-27fbc46f191a'
    ]
  },
  {
    _id: '9471e481-42b7-4d27-bfe6-b67db8569b75',
    first_name: 'Wilona',
    last_name: 'Beddard',
    date_of_birth: '4/18/1981',
    hometownCity: 'Indianapolis',
    hometownState: 'IN',
    books: [
      '74ec757d-0ddd-4035-a8ff-2f10888d393d',
      'c6221e7b-8a00-4d7d-adf3-c76eebba17b6',
      '023e5a19-e295-4efa-97ea-3b6c45a9c82d',
      'eea2ad7a-c25d-4e5e-9c3a-bf10a9dd4307'
    ]
  },
  {
    _id: 'af68a026-f040-4770-9c99-75dd45d64ca1',
    first_name: 'Marlin',
    last_name: 'Wilder',
    date_of_birth: '7/2/1963',
    hometownCity: 'Fort Wayne',
    hometownState: 'IN',
    books: ['b863ba2a-5494-4bac-8e76-80869ac61f37']
  },
  {
    _id: 'e8f3227b-2449-42ab-a580-8a7a1c0b2b1e',
    first_name: 'Joellen',
    last_name: 'McLernon',
    date_of_birth: '1/2/1923',
    hometownCity: 'Mobile',
    hometownState: 'AL',
    books: [
      'b043b15d-9150-4af1-924b-824ae1ca5399',
      'e61da3ab-7bcc-45d2-89e2-b2a1d0b75620'
    ]
  },
  {
    _id: 'a02c43f3-0026-4e74-bed7-1802d54daa2b',
    first_name: 'Heda',
    last_name: 'Vanes',
    date_of_birth: '5/24/1934',
    hometownCity: 'Saint Louis',
    hometownState: 'MO',
    books: ['6174a63e-ac49-44cc-9236-4610915f44e9']
  },
  {
    _id: '323edad0-87ac-46b3-b5a3-b0b2ace82293',
    first_name: 'Agathe',
    last_name: 'Aaron',
    date_of_birth: '8/14/2003',
    hometownCity: 'Seminole',
    hometownState: 'FL',
    books: [
      '94348224-7c9e-4840-b058-9c84b555abbc',
      'c97bf9e9-03b2-4019-908a-c7c9fc56f9ad',
      'cf888e6e-a49e-4ae6-8d7d-f1b983067bd4'
    ]
  },
  {
    _id: 'f4a50447-d8a4-4c16-88f8-95340704c772',
    first_name: 'Emmye',
    last_name: 'Collingdon',
    date_of_birth: '6/11/1983',
    hometownCity: 'Greenville',
    hometownState: 'SC',
    books: [
      'f154ae81-ce36-47f0-a89c-03981ca44878',
      '9c32f4fe-f01a-4933-a459-202dfd840ee8',
      'f6bc1d60-fba3-4b12-926d-ef1cce518335'
    ]
  },
  {
    _id: 'f44f7f78-2326-465b-8abe-9724da08ac22',
    first_name: 'Benn',
    last_name: 'Bulle',
    date_of_birth: '8/4/1966',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: [
      '7ce0601a-b820-4c26-b9d0-74faee75cb56',
      '92c1d796-792f-4818-8813-91eca2111e49',
      'd3d293ff-af69-427c-842a-e5632293cedd',
      'e6e7a824-5875-42a9-916d-0156411ae69b'
    ]
  },
  {
    _id: '305ec477-b0ba-481c-a4b5-11696902ce6c',
    first_name: 'Nathanael',
    last_name: 'Guilford',
    date_of_birth: '6/1/1918',
    hometownCity: 'Round Rock',
    hometownState: 'TX',
    books: ['2f8d9f55-be33-4220-92f4-1156a8679734']
  },
  {
    _id: '843c38ae-9d74-44e1-aca2-edce2ca95280',
    first_name: 'Wynn',
    last_name: 'Polycote',
    date_of_birth: '2/6/1919',
    hometownCity: 'Syracuse',
    hometownState: 'NY',
    books: [
      'a74cc3a3-e8cb-4751-89de-22eea8f64393',
      '2f343d7b-e52d-4b79-946b-bca5fe9bdbaa'
    ]
  },
  {
    _id: '6b979044-6c52-4d95-944d-b0f08c724f1c',
    first_name: 'Gay',
    last_name: 'Stoffersen',
    date_of_birth: '7/9/1934',
    hometownCity: 'Oklahoma City',
    hometownState: 'OK',
    books: [
      '2a195547-19a8-42bf-9c2a-735b0499f8f2',
      '3d07557e-17cc-47b3-afd5-950657d3c48e',
      '23928e40-be04-4d20-8320-face45ebc2a1'
    ]
  },
  {
    _id: '27bc84d7-bd36-4bc2-9508-843db5d5de37',
    first_name: 'Philip',
    last_name: 'Lochran',
    date_of_birth: '10/19/2004',
    hometownCity: 'Southfield',
    hometownState: 'MI',
    books: ['e38ce396-176e-4516-97da-7ec894ac02d0']
  },
  {
    _id: '27e677cd-e10c-47e5-b88b-df85aaddaf2a',
    first_name: 'Cristie',
    last_name: 'Solley',
    date_of_birth: '7/13/1943',
    hometownCity: 'Albany',
    hometownState: 'NY',
    books: [
      '105bd1ee-86c3-45c9-a7f4-ba338bd59552',
      '636bcc81-193e-49c3-bfdf-309618d03c26'
    ]
  },
  {
    _id: 'bbb3f25b-597e-42cf-adcd-4b6f04c9373d',
    first_name: 'Stephenie',
    last_name: 'Monnery',
    date_of_birth: '2/24/1988',
    hometownCity: 'Tucson',
    hometownState: 'AZ',
    books: ['cfbb02cb-b8f1-4fd2-bb79-91890aca2cb0']
  },
  {
    _id: 'ae18bcc9-defc-4837-ba7e-5139feb8931c',
    first_name: 'Sheelah',
    last_name: 'Mayou',
    date_of_birth: '11/27/1957',
    hometownCity: 'Tulsa',
    hometownState: 'OK',
    books: []
  },
  {
    _id: 'e3d0defc-011b-4142-9e94-c6831702e03f',
    first_name: 'Judah',
    last_name: 'McKoy',
    date_of_birth: '2/2/1924',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: []
  },
  {
    _id: '9ffaabec-fe9e-4c5e-b81d-054b562d168b',
    first_name: 'Anne',
    last_name: 'Dovinson',
    date_of_birth: '2/18/1947',
    hometownCity: 'Nashville',
    hometownState: 'TN',
    books: [
      'cb18b434-3e3d-4fa9-9d6b-3ef3fa37e91a',
      '131c7962-6fb7-466b-8150-0f64d1577cad',
      '48624e5e-c188-4c89-a649-4e67fb4751f5'
    ]
  },
  {
    _id: '21d34ada-c6e8-4b30-a25e-399eacb27ef9',
    first_name: 'Fons',
    last_name: 'Bradford',
    date_of_birth: '1/2/1976',
    hometownCity: 'Duluth',
    hometownState: 'MN',
    books: [
      'c38589d1-26df-4001-bd1a-3a934616be48',
      '1896d1f2-01bb-491c-8c00-74ce81806452',
      '4ab0787d-b058-49de-9a5d-4d702d7eb445',
      '22f2e5f3-5e8a-4966-a6a2-ca029f5fb215'
    ]
  },
  {
    _id: '309527ab-c171-4f50-9e20-a221e820eed3',
    first_name: 'Jori',
    last_name: 'Sollis',
    date_of_birth: '9/30/1953',
    hometownCity: 'San Francisco',
    hometownState: 'CA',
    books: [
      '97f207a5-9446-4088-ba69-46c90a172041',
      'a54b8039-0bf6-44a9-b11f-0614f4cc6b3e'
    ]
  },
  {
    _id: '6c9ab84b-60f8-4bce-9675-07767d6573a0',
    first_name: 'Alfie',
    last_name: 'Anthoine',
    date_of_birth: '1/13/1966',
    hometownCity: 'Youngstown',
    hometownState: 'OH',
    books: [
      '033924b7-3c2a-449d-8683-a693dc93957f',
      'd2cde7c3-0dac-4b60-8793-709695e38325'
    ]
  },
  {
    _id: '001f1281-2ae9-4979-bd3a-c44dd3381af6',
    first_name: 'Gilles',
    last_name: 'Guihen',
    date_of_birth: '7/11/1972',
    hometownCity: 'Flushing',
    hometownState: 'NY',
    books: [
      '2f97ccec-17fb-486e-b249-d18c6ead7fa7',
      'eacf85aa-237e-43f7-8bd0-3e4551d80f8e'
    ]
  },
  {
    _id: '4e880e2f-9b90-413e-83b4-743431624957',
    first_name: 'Hazlett',
    last_name: 'MacCafferky',
    date_of_birth: '11/22/1923',
    hometownCity: 'Fort Worth',
    hometownState: 'TX',
    books: [
      'be38347e-edea-4fb2-acc7-49cd6c5d5a1c',
      '9b70a8b5-368d-471f-be67-feac3bb48197'
    ]
  },
  {
    _id: '9145b628-015b-442e-8d0a-b69f2ba3b9df',
    first_name: 'Almeta',
    last_name: 'Borgars',
    date_of_birth: '3/7/1939',
    hometownCity: 'Tucson',
    hometownState: 'AZ',
    books: []
  },
  {
    _id: 'e73b4d82-5cd7-49ec-8257-c278497e72dd',
    first_name: 'Hammad',
    last_name: "O'Hanlon",
    date_of_birth: '9/15/1925',
    hometownCity: 'Ogden',
    hometownState: 'UT',
    books: []
  },
  {
    _id: 'fc6c44ff-62cc-4019-8816-00eff3686d31',
    first_name: 'Welby',
    last_name: 'Bauduccio',
    date_of_birth: '11/3/1951',
    hometownCity: 'Long Beach',
    hometownState: 'CA',
    books: [
      'd1ac7c2f-94e3-4ddf-bb10-c9edcc352db1',
      'b92456d8-fe19-4c8d-8dab-8bf1879a79fe',
      'cedf4269-b7fd-4a81-9030-c648128ada46',
      '0fc296d2-c5d0-45e1-b8b5-974424493526'
    ]
  },
  {
    _id: '94077acf-ea7c-404c-ae53-34e51481b4a8',
    first_name: 'Demetria',
    last_name: 'Tynemouth',
    date_of_birth: '11/27/1959',
    hometownCity: 'Philadelphia',
    hometownState: 'PA',
    books: []
  },
  {
    _id: 'c7278d49-3e43-4cb8-8a09-a1eb4d86c8aa',
    first_name: 'Marga',
    last_name: 'Ramelet',
    date_of_birth: '9/24/1967',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: ['e896c93f-7761-4ddc-b722-ca8d92b8cdc9']
  },
  {
    _id: 'a62686d4-f556-42ca-9ad7-8443e1a8d285',
    first_name: 'Colman',
    last_name: 'Rehm',
    date_of_birth: '3/13/1938',
    hometownCity: 'White Plains',
    hometownState: 'NY',
    books: [
      'b606f4cf-47b8-43f3-8b5a-392ed257583a',
      '5fbbda70-61ba-4e8e-9d7b-45bc2b087827'
    ]
  },
  {
    _id: '11d8a604-6039-4287-ad62-4a1359cb9929',
    first_name: 'Timothea',
    last_name: 'Syddon',
    date_of_birth: '11/7/1949',
    hometownCity: 'Columbus',
    hometownState: 'OH',
    books: [
      'e770b654-c4fb-44cf-8269-c1a1c1c7aed0',
      '29a1f9e9-ff23-47a2-bd5f-450df366f99c',
      '7954adf8-1c72-41b4-a42c-49f35f459113',
      'ea38d202-1878-4661-b1c7-f118ca409b0c',
      '5bf0f3af-07b3-47ab-b0c7-67616437cc7f'
    ]
  },
  {
    _id: '4d618c5b-35a3-458f-9473-658d7ff36adb',
    first_name: 'Adrianne',
    last_name: 'Baughen',
    date_of_birth: '5/9/1979',
    hometownCity: 'Salt Lake City',
    hometownState: 'UT',
    books: []
  },
  {
    _id: '2e3561a6-3e18-4747-8f09-8a7456de98bd',
    first_name: 'Nicola',
    last_name: 'Casburn',
    date_of_birth: '7/5/1967',
    hometownCity: 'New Bedford',
    hometownState: 'MA',
    books: ['32a8bfe6-c798-4139-8957-7265045dcfdf']
  },
  {
    _id: '95e88e8a-f672-45b8-aa8d-d2e7a4a20dc1',
    first_name: 'Rockey',
    last_name: 'Amphlett',
    date_of_birth: '9/26/1938',
    hometownCity: 'Columbia',
    hometownState: 'SC',
    books: [
      '0bc9c472-e2ff-4acf-9750-9d3fd665244b',
      '7a61cb4d-6295-435a-8ad9-33298d8cba10'
    ]
  },
  {
    _id: '4bd7c560-c60b-44cb-af84-a5cad18338eb',
    first_name: 'Rockie',
    last_name: 'Brunet',
    date_of_birth: '10/24/1987',
    hometownCity: 'Indianapolis',
    hometownState: 'IN',
    books: []
  },
  {
    _id: '20ed03f8-2c9b-4175-9596-871a532b8560',
    first_name: 'Germana',
    last_name: 'Freeborn',
    date_of_birth: '2/20/1969',
    hometownCity: 'West Palm Beach',
    hometownState: 'FL',
    books: ['a592a4b9-45a3-4f01-87bb-32d1848474a4']
  },
  {
    _id: '948fa67c-57bd-48a9-8cd6-9d4ec32155ec',
    first_name: 'Lona',
    last_name: "D'Orsay",
    date_of_birth: '8/5/1909',
    hometownCity: 'Fairbanks',
    hometownState: 'AK',
    books: [
      '97e9121c-adaa-4cda-be34-c1573624bb1a',
      '418afaae-891f-4b7d-8ad3-e70bee5b001c'
    ]
  },
  {
    _id: '934bfab2-f886-4a32-9f68-b27a4e423b01',
    first_name: 'Skye',
    last_name: 'Wingeatt',
    date_of_birth: '9/11/1999',
    hometownCity: 'Tallahassee',
    hometownState: 'FL',
    books: []
  },
  {
    _id: 'c6b583b0-8011-496d-a23b-8d6e62d43a38',
    first_name: 'Mario',
    last_name: 'Adlington',
    date_of_birth: '6/22/1939',
    hometownCity: 'Yonkers',
    hometownState: 'NY',
    books: [
      'c4ccc400-cf1a-49d3-ba2f-df4093488bfb',
      'e0679801-81d3-40d8-9388-5c3e8a01c80a',
      '2475a215-b819-47aa-95a7-9acc3752099c',
      'f91b7b56-5123-436c-8b77-64ffaeba2b25',
      '60f97774-a1f7-4020-bbc8-894aa1e401b9',
      '1b7744f7-012a-493d-b3cf-975305a2d135',
      '9f882913-5399-4b47-b430-3032272ce880'
    ]
  },
  {
    _id: 'bc01cf84-1a48-404d-b8b5-91be540a7dc6',
    first_name: 'Zane',
    last_name: 'Arling',
    date_of_birth: '6/14/1903',
    hometownCity: 'Aurora',
    hometownState: 'CO',
    books: []
  },
  {
    _id: 'dcc3ecde-e73e-438f-8753-64a6508b9f90',
    first_name: 'Eloise',
    last_name: 'Farres',
    date_of_birth: '9/14/1963',
    hometownCity: 'Dallas',
    hometownState: 'TX',
    books: [
      'd0117d84-0aed-4596-a122-858c64d54491',
      '8ec61ffa-9219-4321-8f96-5511e5c857d6',
      '4322af20-3a9a-4cd0-9748-13379fb8dc58',
      'ae036cbd-0a2b-4804-a63f-b3e67a01e1d2'
    ]
  },
  {
    _id: '3ef0310a-7faf-470b-acdb-870d3896102f',
    first_name: 'Gay',
    last_name: 'Forder',
    date_of_birth: '2/17/1931',
    hometownCity: 'Southfield',
    hometownState: 'MI',
    books: []
  },
  {
    _id: '8c2a33f2-0222-454d-89d4-4b8b79071c49',
    first_name: 'Casey',
    last_name: 'Flucks',
    date_of_birth: '1/8/1999',
    hometownCity: 'Springfield',
    hometownState: 'MA',
    books: [
      '142f46e8-7244-4e9f-8d01-38a64c7465c8',
      'c1f2f228-08c6-4825-8acd-2ea077c9bbd9',
      '9f0f1f6b-ed45-4148-85cd-7493b6df044a'
    ]
  },
  {
    _id: '1a0178ca-0701-4e3f-8266-1e2034229cf7',
    first_name: 'Sallyann',
    last_name: 'Tinkham',
    date_of_birth: '5/22/1907',
    hometownCity: 'Baton Rouge',
    hometownState: 'LA',
    books: []
  },
  {
    _id: '52c6e175-5bf4-4671-ac86-665e4dc54901',
    first_name: 'Kayle',
    last_name: 'Glitherow',
    date_of_birth: '9/14/1987',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: [
      '2128de40-de77-49b5-8ac0-68e48910c894',
      'a489f5fb-9f6c-4b6a-8eaa-3a3c8a805525',
      '995cf4f0-4bd3-4ba7-a47c-fac5e3e17d0c',
      '33d4a7f6-fd79-40e3-8c55-db381748fbf5',
      'f567162d-9a06-4613-9ea4-864a894e8906'
    ]
  },
  {
    _id: 'c9dd26e0-d10a-41fe-b54e-1f50cc288915',
    first_name: 'Marybeth',
    last_name: 'Hakewell',
    date_of_birth: '12/4/1939',
    hometownCity: 'Trenton',
    hometownState: 'NJ',
    books: [
      'c8d092d0-2fe7-492c-9124-51dcc0b3c96b',
      '056133df-59a6-43ed-9d00-98706dac2714',
      '68262a36-ece2-476c-84e4-d28c83c32020',
      'fedeef51-60c7-4b41-b6ca-4f069eeb72e3'
    ]
  },
  {
    _id: 'efa93868-002b-4cf5-a332-1a61c642e834',
    first_name: 'Arabelle',
    last_name: 'Hedin',
    date_of_birth: '1/2/1925',
    hometownCity: 'San Antonio',
    hometownState: 'TX',
    books: [
      '06c4b452-6006-4f41-acc7-4965aebd5f8c',
      'a0cd32a0-a4a0-4d89-a636-861baa286e89',
      'f374e2fa-2e13-46c6-8333-76e844a44ef8',
      'fc21589d-1d5a-483e-8a32-668bb849ab2b'
    ]
  },
  {
    _id: '3693b60f-d979-4370-89dc-54c243a7c8af',
    first_name: 'Wallace',
    last_name: 'Pallent',
    date_of_birth: '9/18/1913',
    hometownCity: 'Corpus Christi',
    hometownState: 'TX',
    books: [
      'abaa574f-39ca-4e0e-acbe-99ea00cf9d2c',
      '65fe2fe1-c7a8-423e-a8e2-d777ac28fb61',
      '751211a7-e248-41f5-953e-7effbc411c17',
      'e474c55d-535d-4288-ab88-c0078ccd0a61',
      '1a88faae-2cb5-46b0-b82b-7a7b87231ae1',
      '72bae0c3-a5b9-405e-b489-d4cfcad303f3'
    ]
  },
  {
    _id: '64eb6b8c-309a-4b79-947f-d1e58a4a5a69',
    first_name: 'Bronnie',
    last_name: 'Duddell',
    date_of_birth: '4/20/1931',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: [
      '36e19920-482c-4bfe-98f5-1c4bfc5561ed',
      '60733e1c-63f0-44cf-bdb2-faadf61cdbf2',
      '5006afb2-f7cb-4ef4-8bf1-3e36b3347da4'
    ]
  },
  {
    _id: '21781c41-f8c7-41c7-9892-d5e2fb698458',
    first_name: 'Jim',
    last_name: 'Houndesome',
    date_of_birth: '3/10/2001',
    hometownCity: 'Anaheim',
    hometownState: 'CA',
    books: [
      '6e75fb30-c2bd-4fc7-8686-3465343ae21a',
      '89d1b5dc-8acf-4079-92da-e2625d023ed1',
      'b22aa257-84f1-4c60-bbed-9ed979e39b3a',
      '7e31fa45-7d8e-4c94-85a2-f25b54a82134'
    ]
  },
  {
    _id: '0dc9dc42-e585-40b2-87dd-6d70b56b4081',
    first_name: 'Henryetta',
    last_name: 'Sherreard',
    date_of_birth: '1/3/1955',
    hometownCity: 'Roanoke',
    hometownState: 'VA',
    books: ['bf014122-dc62-4454-a7e3-70f7e02d13ac']
  },
  {
    _id: '61aafa5f-c278-426b-836e-0856c32345f1',
    first_name: 'Deerdre',
    last_name: 'Arnely',
    date_of_birth: '9/28/1969',
    hometownCity: 'Jeffersonville',
    hometownState: 'IN',
    books: []
  },
  {
    _id: 'a1c17e9b-39b9-4e1a-a16b-b82467a85d38',
    first_name: 'Costanza',
    last_name: 'Richfield',
    date_of_birth: '12/1/1904',
    hometownCity: 'Myrtle Beach',
    hometownState: 'SC',
    books: ['2ca3742c-923f-451e-b898-284ee099a6f4']
  },
  {
    _id: 'e2f25558-3670-4245-a14c-96411334340c',
    first_name: 'Winona',
    last_name: 'Limbert',
    date_of_birth: '4/18/1982',
    hometownCity: 'Gainesville',
    hometownState: 'FL',
    books: [
      '0dcf7670-2564-490d-bd31-6208a655648b',
      '7f52d448-0b74-4a7e-bcf5-d3ce9863a244',
      'c720a847-6716-4b0d-9e59-77e26a4fc45e'
    ]
  },
  {
    _id: '49f8e20a-f433-45a9-b3ce-0106fda6bc3e',
    first_name: 'Fulvia',
    last_name: 'Endrizzi',
    date_of_birth: '9/3/1903',
    hometownCity: 'Fort Myers',
    hometownState: 'FL',
    books: [
      '2b9f5ebb-8fe2-448a-97ea-9667de9de76b',
      '7caf2c74-7f6e-4258-8db2-3eb066f1a4b7'
    ]
  },
  {
    _id: 'a9e093e8-df30-437b-a9fd-83cf65f507d4',
    first_name: 'Wadsworth',
    last_name: 'Cottage',
    date_of_birth: '8/16/1996',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: ['1a53d1c2-23e4-4348-8d41-23dc57430b4d']
  },
  {
    _id: 'b2a68b98-ebf6-4259-ba4f-a95df6fcd8c2',
    first_name: 'Terese',
    last_name: 'Klug',
    date_of_birth: '8/2/1921',
    hometownCity: 'Midland',
    hometownState: 'TX',
    books: [
      '0e2ad70a-4c0d-472b-8351-0eb88e414098',
      'e0e77ce4-1c07-40ae-83a3-9fcf83cc4490'
    ]
  },
  {
    _id: '38b2d1be-534d-4ca7-b65f-9d176d49a2b0',
    first_name: 'Delainey',
    last_name: 'Trudgian',
    date_of_birth: '5/18/1975',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: []
  },
  {
    _id: 'dd3af7fc-9c58-42ad-8a42-4b6aa49d5639',
    first_name: 'Rollins',
    last_name: "O'Bruen",
    date_of_birth: '5/25/2003',
    hometownCity: 'San Diego',
    hometownState: 'CA',
    books: []
  },
  {
    _id: '287da5d1-962d-4c4e-b059-f4a1e520fb3b',
    first_name: 'Mariquilla',
    last_name: 'Pellew',
    date_of_birth: '7/8/1994',
    hometownCity: 'Charlotte',
    hometownState: 'NC',
    books: []
  },
  {
    _id: 'b747c2cc-e527-405e-b8a1-ee8c823be501',
    first_name: 'Hew',
    last_name: 'McTerrelly',
    date_of_birth: '9/16/2000',
    hometownCity: 'Little Rock',
    hometownState: 'AR',
    books: [
      '5fa144b8-a2ba-4bc3-82f5-004a491418f5',
      '3c44bd58-128b-4abe-8983-285cc90c25d5'
    ]
  },
  {
    _id: '0a606ad7-03a3-4326-aaab-fa1a2dd399af',
    first_name: 'Clo',
    last_name: 'Lembcke',
    date_of_birth: '10/27/1922',
    hometownCity: 'Brooklyn',
    hometownState: 'NY',
    books: [
      '5575647a-a686-474b-9ae8-fd49a08a0414',
      '62d35c56-d9fb-4560-a52b-b96644cf0600',
      'fd928e54-02a8-4534-91c4-cf67d8822f5c',
      '4c4483f1-dc81-49e6-a8c8-c04476d743b3',
      '9325ce30-4881-4349-8256-773592608051',
      'f892f4af-ba32-4306-8e72-3b414f6820a1',
      '8dc12177-08a7-4265-a2c8-be990d90c970',
      '0285d55d-3905-4de0-b7c4-1e70144f92a0',
      '3527706c-579b-4a27-b2da-ab018c76f7ff',
      '4fe311d7-b1a4-4adb-b7a5-9920ec571997'
    ]
  },
  {
    _id: 'f3941bf0-a92b-4f5f-b14b-0c4e81c3465b',
    first_name: 'Lizzy',
    last_name: 'Rraundl',
    date_of_birth: '5/27/1981',
    hometownCity: 'Corpus Christi',
    hometownState: 'TX',
    books: ['461c9b76-db9c-45a3-b9e9-59e445dfb7f0']
  },
  {
    _id: '948987d5-13ce-4725-988b-105c05ece819',
    first_name: 'Justis',
    last_name: 'Bann',
    date_of_birth: '5/16/1945',
    hometownCity: 'Rockford',
    hometownState: 'IL',
    books: [
      'dffe6e70-2f34-4e46-8e09-16c279a62d2e',
      '2544b20e-e60c-43c4-b2c9-e54e7bce5ae5',
      '8eadf719-599a-4fee-8d30-9eaaddc39537'
    ]
  },
  {
    _id: '54d3fa8d-fa45-451f-9f29-d5e35b8c80dd',
    first_name: 'Oswald',
    last_name: 'MacLise',
    date_of_birth: '5/12/1983',
    hometownCity: 'Greensboro',
    hometownState: 'NC',
    books: [
      '8a031d8a-4c8a-4377-baff-94b92d320c51',
      'c540e08f-34c3-4017-9c2c-c342c87a9cb4',
      '5db38de1-dfd0-476c-82c6-9501f6c5206e'
    ]
  },
  {
    _id: 'b79f7ba2-4c21-4fa9-86d2-ddeaa492a278',
    first_name: 'Jordan',
    last_name: 'Iorillo',
    date_of_birth: '12/28/1930',
    hometownCity: 'Toledo',
    hometownState: 'OH',
    books: ['d5b62a67-831d-401c-a24f-4639e685d3f2']
  },
  {
    _id: 'ca226c81-0ae2-40ba-9a58-57282bc2f6af',
    first_name: 'Evie',
    last_name: 'Yokley',
    date_of_birth: '8/3/1950',
    hometownCity: 'Tampa',
    hometownState: 'FL',
    books: ['c3171477-4608-4357-aa5b-d507cd67c2ef']
  },
  {
    _id: '7c41ad9c-64fb-4705-8669-af3a9fcdba04',
    first_name: 'Izabel',
    last_name: 'Fernehough',
    date_of_birth: '4/2/1972',
    hometownCity: 'Rochester',
    hometownState: 'NY',
    books: []
  },
  {
    _id: 'b76505c2-9510-4e62-bdb6-db2a2906059b',
    first_name: 'Quill',
    last_name: 'Aartsen',
    date_of_birth: '10/16/1953',
    hometownCity: 'Charleston',
    hometownState: 'WV',
    books: [
      '4a255688-fe56-4697-b26b-1127031fc253',
      '88b7acd1-e7a5-475a-8c5f-0ec93d67ec62'
    ]
  },
  {
    _id: '6a072217-4ef7-4c73-9117-7a51f0cae605',
    first_name: 'Patrice',
    last_name: 'Haskey',
    date_of_birth: '6/15/1943',
    hometownCity: 'Los Angeles',
    hometownState: 'CA',
    books: [
      '9fdc23b8-77e9-4e99-a80d-05d03325081d',
      'da595b11-925b-4513-8664-b02123fd3175',
      '19dd4956-c9e0-48ef-a957-8838ba361463',
      'b2d66e43-e84b-4430-b18c-8e1a71dcaa0d',
      '343f5da9-14f8-405b-974a-45f36ceb8a79'
    ]
  },
  {
    _id: 'dca95873-95d1-4b6f-a3ec-18a2e3c72f6c',
    first_name: 'Sonya',
    last_name: 'Franz',
    date_of_birth: '9/8/1945',
    hometownCity: 'Charlotte',
    hometownState: 'NC',
    books: [
      '76c0bdcc-f280-4d4e-b129-4f7dd750569b',
      '2989c7ba-2a17-404d-ba83-c15ad2cde988'
    ]
  },
  {
    _id: '9d71c305-43e5-465f-85ff-17e5b45fb72e',
    first_name: 'Kalindi',
    last_name: 'McKeeman',
    date_of_birth: '2/25/1995',
    hometownCity: 'Abilene',
    hometownState: 'TX',
    books: [
      'ca18c740-34bd-4987-8bfe-307dba0159e1',
      '54510583-d436-41d1-9b09-56a4535647fa',
      '17e2a20f-0a61-4e90-bed1-232aee1591a1',
      '5c48491e-fbc9-422e-b035-02b951991b2c'
    ]
  },
  {
    _id: 'e7b3869d-bcc4-4a5d-b58d-76e895fece8f',
    first_name: 'Melodee',
    last_name: 'Unwin',
    date_of_birth: '6/18/2002',
    hometownCity: 'Boise',
    hometownState: 'ID',
    books: ['e9a6c28a-3305-4e44-a02b-a82443760eb5']
  },
  {
    _id: '736bc29c-b7d2-4e02-b38a-03cbe1334574',
    first_name: 'Roth',
    last_name: 'Arendt',
    date_of_birth: '7/26/1979',
    hometownCity: 'Bloomington',
    hometownState: 'IL',
    books: [
      '6f121cc1-afa9-4507-b4e7-26907e99f023',
      'c99608f5-95af-446f-92a8-50700afafe4e'
    ]
  },
  {
    _id: 'b9adbf2f-9a5f-4e66-bbbc-c46fde950257',
    first_name: 'Leeanne',
    last_name: 'Bellefonte',
    date_of_birth: '4/27/1966',
    hometownCity: 'Houston',
    hometownState: 'TX',
    books: [
      'ee3026b6-0cf3-4260-a2dc-5c1981fb039f',
      'b10af69f-697a-4629-afdb-13b034d0b386',
      '147768e7-7193-4d57-ad35-73d9283d92dd',
      'fb2aac79-d62a-4b9d-98c8-fbf428ee5c9e'
    ]
  },
  {
    _id: '25abba4a-375c-44db-8469-d6fd32183d8f',
    first_name: 'Gayle',
    last_name: 'Snodin',
    date_of_birth: '9/23/1974',
    hometownCity: 'Cincinnati',
    hometownState: 'OH',
    books: ['db726510-65e6-46dd-bdbb-d88476dffce1']
  },
  {
    _id: '8a956ca2-420d-4807-b075-af2c1095aac2',
    first_name: 'Ealasaid',
    last_name: 'Blooman',
    date_of_birth: '5/31/1980',
    hometownCity: 'Syracuse',
    hometownState: 'NY',
    books: []
  },
  {
    _id: '6dd60757-b807-4923-996a-6b493bc20b4e',
    first_name: 'Claudia',
    last_name: 'Kalewe',
    date_of_birth: '4/8/1944',
    hometownCity: 'Pinellas Park',
    hometownState: 'FL',
    books: [
      '9ea273bd-41c0-4232-8788-308482fb78ce',
      'd2eee20c-14dd-4f9c-af10-afdd17473b29'
    ]
  },
  {
    _id: '5884bd8b-46fb-4fb3-9a39-52acf38b1d3a',
    first_name: 'Madelene',
    last_name: 'MacKnocker',
    date_of_birth: '1/17/1920',
    hometownCity: 'Nashville',
    hometownState: 'TN',
    books: [
      'ee8fcace-5ae7-4fbd-bbe8-997e90449d59',
      '56319b3b-67d4-4ebc-98f7-e1bcae6171e4'
    ]
  },
  {
    _id: 'cdf048ac-6874-45e9-8a93-2f561c22ed4e',
    first_name: 'Olga',
    last_name: 'Brekonridge',
    date_of_birth: '10/13/1976',
    hometownCity: 'Seattle',
    hometownState: 'WA',
    books: [
      '84c88e5c-38aa-4a7c-9fc5-94c2965f839d',
      '8ef79222-ea8f-4771-b4b7-99621e29b614',
      'cdba64f8-7937-46f7-b244-656d278d2f3a',
      '66f56439-63a5-47ac-b276-30f447863198',
      '7c379fde-7e84-4b76-8223-0ff03b9afbe7'
    ]
  },
  {
    _id: '828b565e-3494-4d6b-b49c-57fd26fd7c06',
    first_name: 'Frankie',
    last_name: 'Gianasi',
    date_of_birth: '6/19/1939',
    hometownCity: 'Olympia',
    hometownState: 'WA',
    books: [
      '8dddc2e1-7802-4942-ad6a-f2b1e2aceb44',
      '0b9a8bbb-90f4-42f5-b28d-0d0abc5815cd'
    ]
  },
  {
    _id: '83d1efaa-138a-4255-9ca1-fb57a8589eea',
    first_name: 'Glenda',
    last_name: 'Sellens',
    date_of_birth: '3/23/1966',
    hometownCity: 'Knoxville',
    hometownState: 'TN',
    books: []
  },
  {
    _id: 'd900d786-8c6b-4397-baf9-2a63650e5b75',
    first_name: 'Madel',
    last_name: 'Lergan',
    date_of_birth: '8/29/1906',
    hometownCity: 'Austin',
    hometownState: 'TX',
    books: [
      '9b36bc9e-7fae-491e-abf1-0caeeea5cf52',
      '62e2adf8-901a-4a1c-9248-ab2b98a3a559',
      'aaeb0cd2-9aa8-46a5-b47f-d2915845c1f5',
      '45142683-86ea-417e-a356-53358217d408'
    ]
  },
  {
    _id: '967a589c-e1d8-443d-a2da-1ebb6b6607db',
    first_name: 'Adrian',
    last_name: 'Chapling',
    date_of_birth: '4/23/1951',
    hometownCity: 'Dallas',
    hometownState: 'TX',
    books: [
      '084aa96b-cd3c-4513-b5fe-2ebd8332ed00',
      '18484004-e517-4a39-9e65-20dec8480ba5'
    ]
  },
  {
    _id: '0d2349b7-cca0-4054-ac1b-bf79888e9685',
    first_name: 'Chere',
    last_name: 'Linforth',
    date_of_birth: '3/8/1915',
    hometownCity: 'Bakersfield',
    hometownState: 'CA',
    books: ['00f424a8-03a6-4c4a-bf26-905c20a3e601']
  },
  {
    _id: '8f9d07e3-a915-4f54-9fe8-fec431e9c4a7',
    first_name: 'Cos',
    last_name: 'Treadgall',
    date_of_birth: '7/13/1959',
    hometownCity: 'Winter Haven',
    hometownState: 'FL',
    books: ['345836c5-e333-45c8-8ca8-ae9cef9ed3ce']
  },
  {
    _id: 'e2bc38f3-6cb9-46ce-b9ae-c37add85877f',
    first_name: 'Erhart',
    last_name: 'Henworth',
    date_of_birth: '12/22/1944',
    hometownCity: 'Tulsa',
    hometownState: 'OK',
    books: []
  },
  {
    _id: '99100b91-59bc-47c2-90bd-ee0ab7a2e814',
    first_name: 'Ely',
    last_name: 'Aaronsohn',
    date_of_birth: '12/5/1981',
    hometownCity: 'Dallas',
    hometownState: 'TX',
    books: []
  },
  {
    _id: '21a83e3a-2755-4cd9-9d49-749bfc7464d6',
    first_name: 'Kikelia',
    last_name: 'Furst',
    date_of_birth: '10/14/1961',
    hometownCity: 'Fresno',
    hometownState: 'CA',
    books: []
  },
  {
    _id: '1f879e69-62db-441c-87f0-3aee9ce63ce8',
    first_name: 'Marietta',
    last_name: 'Bettison',
    date_of_birth: '9/7/1916',
    hometownCity: 'Marietta',
    hometownState: 'GA',
    books: []
  },
  {
    _id: 'f61c8a0e-2c22-434f-93c8-13b06c9c9de5',
    first_name: 'Norean',
    last_name: 'Ellacott',
    date_of_birth: '1/12/1932',
    hometownCity: 'Oklahoma City',
    hometownState: 'OK',
    books: [
      'be13b54f-5f85-427e-a527-d27a55cb51a9',
      '2e6a4387-909d-4632-ab16-89236a0d70ab'
    ]
  },
  {
    _id: '6bca2886-6a4e-4412-acf3-e65c4d41e976',
    first_name: 'Annabella',
    last_name: 'Martinon',
    date_of_birth: '12/24/1916',
    hometownCity: 'Lincoln',
    hometownState: 'NE',
    books: ['85c76621-8a2e-4ffe-9ac6-e6c8ed41964f']
  },
  {
    _id: '0730f806-6e3f-4aaf-a34a-0b57f5045916',
    first_name: 'Deane',
    last_name: 'Blackett',
    date_of_birth: '8/15/1956',
    hometownCity: 'West Palm Beach',
    hometownState: 'FL',
    books: ['680758fa-6d21-422e-9e27-234d4bf9c2e2']
  },
  {
    _id: '60d69e11-f653-4d21-94b4-71c145def2ef',
    first_name: 'Roberta',
    last_name: 'Viant',
    date_of_birth: '7/16/1940',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: ['1397cc61-2747-4625-a617-aedcfb41f53f']
  },
  {
    _id: '0361b8c4-b166-4025-ba18-4f5893c101a5',
    first_name: 'Rollo',
    last_name: 'Jacobowitz',
    date_of_birth: '7/15/1933',
    hometownCity: 'Muncie',
    hometownState: 'IN',
    books: ['bab49ca6-a079-410d-acb6-1ad1172a4d9d']
  },
  {
    _id: '5fc2ddea-102c-45ad-b6a0-1e1fb4fd6a3d',
    first_name: 'Bernard',
    last_name: 'Ellcome',
    date_of_birth: '3/30/1986',
    hometownCity: 'Stockton',
    hometownState: 'CA',
    books: ['f0fdd24c-60ae-402d-bd82-0aa01aaff6e6']
  },
  {
    _id: 'a9dbdd11-e458-4039-879d-3dd2ad3b79a3',
    first_name: 'Bamby',
    last_name: 'Pates',
    date_of_birth: '12/2/1990',
    hometownCity: 'Saginaw',
    hometownState: 'MI',
    books: [
      'be4c325a-8892-4fe8-b042-0533bb774611',
      'd757ea56-9379-4e2f-9210-b37d41044916',
      '843e6283-08cd-4732-9c26-18c414694483'
    ]
  },
  {
    _id: '6482a58f-e3fc-4be5-bbb7-6a22083c8978',
    first_name: 'Denys',
    last_name: 'Bilyard',
    date_of_birth: '1/31/1950',
    hometownCity: 'Young America',
    hometownState: 'MN',
    books: ['ca4ed038-0b29-4d5d-a504-3733562920c4']
  },
  {
    _id: 'f8b2fd4a-7c66-4a19-8e60-db9fe8eaf38d',
    first_name: 'Katrinka',
    last_name: 'Benallack',
    date_of_birth: '3/6/1900',
    hometownCity: 'Anchorage',
    hometownState: 'AK',
    books: []
  },
  {
    _id: '89401b92-160a-4248-8e64-ad9012889d2e',
    first_name: 'Barnebas',
    last_name: 'Doniso',
    date_of_birth: '10/27/1920',
    hometownCity: 'Austin',
    hometownState: 'TX',
    books: ['aa2f1ecb-026b-4dc6-afe3-7f6640b34056']
  },
  {
    _id: '0396f370-f0b1-492b-8200-5003b76e66b2',
    first_name: 'Almire',
    last_name: 'Hews',
    date_of_birth: '3/12/1984',
    hometownCity: 'Reading',
    hometownState: 'PA',
    books: [
      '24db3c5b-2878-4b58-aa12-734136a6002a',
      'aa25cb4d-a1e2-46a8-a935-c5b12a950395',
      'bd5f4731-ab3d-47e5-afb5-074fb042ded9'
    ]
  },
  {
    _id: '38216718-75b7-43ed-9e29-82c7935d3a53',
    first_name: 'Sloane',
    last_name: 'Marlow',
    date_of_birth: '8/25/1915',
    hometownCity: 'Atlanta',
    hometownState: 'GA',
    books: ['78bcbb3c-55a2-4e52-b948-eb4c547eb680']
  },
  {
    _id: 'bfcd785c-5c08-4410-b5e3-fa286931ff0b',
    first_name: 'Jannel',
    last_name: 'Gansbuhler',
    date_of_birth: '5/11/1994',
    hometownCity: 'Stockton',
    hometownState: 'CA',
    books: [
      'f1267e02-ef43-4c40-b02b-56d0f7d0ee70',
      'b1c1ff3c-b2e5-4318-8ef9-189b7dd8b0ef'
    ]
  },
  {
    _id: '7e3561ac-baa5-4657-a822-5e8225f3f860',
    first_name: 'Mei',
    last_name: 'Everington',
    date_of_birth: '5/30/1964',
    hometownCity: 'Salem',
    hometownState: 'OR',
    books: [
      'd380615f-8c4f-4bdb-bd5a-15b87c0b3385',
      '8f0f4069-8543-4d3f-84e5-db6bb229d1c8',
      '50f56eea-200d-48da-a771-8e7039cd17ad'
    ]
  },
  {
    _id: 'cb441ec2-8684-4f75-b70c-e1d6d75b0bd1',
    first_name: 'Lorene',
    last_name: 'Neilan',
    date_of_birth: '3/29/1966',
    hometownCity: 'Jackson',
    hometownState: 'MS',
    books: []
  },
  {
    _id: 'cf9270bb-52a4-4df9-905b-6af3fb9abc27',
    first_name: 'Erskine',
    last_name: 'Giacopetti',
    date_of_birth: '3/20/1929',
    hometownCity: 'Birmingham',
    hometownState: 'AL',
    books: ['42d7b477-3b51-4fe6-bdd4-196ef1090e40']
  },
  {
    _id: 'f3e25d49-92b1-46eb-b084-4d43a01bad23',
    first_name: 'Bendick',
    last_name: 'Lean',
    date_of_birth: '8/25/1934',
    hometownCity: 'Syracuse',
    hometownState: 'NY',
    books: [
      '6d79b7b4-e852-425c-9dc9-a17a793fac33',
      'a300954f-6f58-4407-865c-1ecd042d4952'
    ]
  },
  {
    _id: '845db672-12b9-45c4-87f9-aa08739a95ad',
    first_name: 'Leigha',
    last_name: 'Convery',
    date_of_birth: '5/13/1919',
    hometownCity: 'Atlanta',
    hometownState: 'GA',
    books: []
  },
  {
    _id: '8db08c4b-7983-4518-9a33-bef0994d925d',
    first_name: 'Noby',
    last_name: 'Lamberth',
    date_of_birth: '1/5/1982',
    hometownCity: 'Albany',
    hometownState: 'NY',
    books: [
      '8807d3d1-c148-4989-8298-fcffd9be14a6',
      '5b685de8-2539-44cc-9b27-21ba7dc7318c'
    ]
  },
  {
    _id: '6a13b638-c3aa-483f-a242-1625cf76fe29',
    first_name: 'Ritchie',
    last_name: 'Garton',
    date_of_birth: '12/6/1952',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: [
      'ec5511ac-9f56-4310-a5e1-5ca8694885a5',
      '0bcc008b-1848-4285-bc82-18e32dc50f4c',
      'dee5c78c-a864-4346-97fe-0d21cecc073b'
    ]
  },
  {
    _id: '170e2509-cc12-461b-997e-cae0e1e1fc79',
    first_name: 'Arda',
    last_name: 'Linstead',
    date_of_birth: '10/19/2001',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: [
      'd29f81b9-0959-4294-af5a-2182dc2cc1c5',
      'dcbbd813-8b00-4c97-ac33-146925a05a9c',
      'ef0c4e81-cd85-48ee-82b8-fe0afe8e50fd'
    ]
  },
  {
    _id: '409aff3e-d33d-447c-85f9-f05ee676dcda',
    first_name: 'Amber',
    last_name: 'Montfort',
    date_of_birth: '7/1/1906',
    hometownCity: 'Columbus',
    hometownState: 'MS',
    books: [
      '7600783b-14a3-47cb-9289-5ebcad04e033',
      'd41e243e-d8b4-4432-a582-9324070c2bcb'
    ]
  },
  {
    _id: '986f11aa-d47d-4c25-b140-7bba66ef6ad3',
    first_name: 'Martyn',
    last_name: 'Tutill',
    date_of_birth: '1/12/1929',
    hometownCity: 'Long Beach',
    hometownState: 'CA',
    books: ['7484659b-42ff-4ba0-92cd-9942a748fa6b']
  },
  {
    _id: '70d3d49a-99d9-448d-bbe9-451b958dbea9',
    first_name: 'Jillayne',
    last_name: 'Cubbit',
    date_of_birth: '5/3/1905',
    hometownCity: 'Flushing',
    hometownState: 'NY',
    books: [
      '316aaae9-c465-45e9-98c8-712f729770ab',
      '55e77070-9fb6-4c63-ab5f-5b44b472ed01'
    ]
  },
  {
    _id: 'c8ae1dbe-60e4-424e-9263-bb03447f6bbf',
    first_name: 'Galen',
    last_name: 'Thorwarth',
    date_of_birth: '11/11/1958',
    hometownCity: 'Anchorage',
    hometownState: 'AK',
    books: [
      '5165359b-11fb-4400-9676-4f257be96edc',
      '1d5e4129-2d92-43e1-bdc2-f6f84758e5d0',
      '9be4590a-eb18-43f5-b6a2-a8db8a314db2'
    ]
  },
  {
    _id: 'aa43e589-af6b-4c96-91e9-8bc908e60c1e',
    first_name: 'Ephraim',
    last_name: 'Oliphant',
    date_of_birth: '4/6/1965',
    hometownCity: 'San Diego',
    hometownState: 'CA',
    books: []
  },
  {
    _id: '888ab9d8-f91e-4640-a951-54100e50d454',
    first_name: 'Jeremias',
    last_name: 'Hillatt',
    date_of_birth: '11/8/1900',
    hometownCity: 'Chicago',
    hometownState: 'IL',
    books: [
      'ab888179-a9b2-4424-b7b8-5490c634bea3',
      'b34dc287-b9bf-4aec-8502-0d67a8a6ff2f',
      '1a03028c-83db-4b0f-a8fe-1ed14bc09da5',
      '352fd7d8-77d8-4d4f-b42a-17924ed5092b'
    ]
  },
  {
    _id: '975ada82-0816-4ebc-b6e2-410a0ebf2f4b',
    first_name: 'Tandy',
    last_name: 'Trenbay',
    date_of_birth: '9/13/1925',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: ['ac1ba9c8-cb32-485d-99bd-65e249c2f5c5']
  },
  {
    _id: '91c1bc2c-c4f5-4ec7-8beb-a456632b12f2',
    first_name: 'Korrie',
    last_name: 'Robinette',
    date_of_birth: '9/9/2000',
    hometownCity: 'Philadelphia',
    hometownState: 'PA',
    books: []
  },
  {
    _id: 'bf51dd35-1eb4-4ba7-8ad2-36e726801715',
    first_name: 'Morna',
    last_name: 'Eby',
    date_of_birth: '2/7/1999',
    hometownCity: 'Oklahoma City',
    hometownState: 'OK',
    books: [
      '945f1fad-0314-4787-8ccf-6b12dec36f25',
      '60fc79c8-acd7-44ec-839e-c4f9b7dfa3c0',
      '79e2ad62-e552-4b41-8675-798d15739cae',
      'd50398a5-1fd4-4a2c-9c6e-ec1c20ad1d2a'
    ]
  },
  {
    _id: 'fd3164ab-cc21-4d6c-89aa-96148c5df31a',
    first_name: 'Erie',
    last_name: 'Maltster',
    date_of_birth: '5/18/1975',
    hometownCity: 'Norfolk',
    hometownState: 'VA',
    books: [
      '13ab4e92-f2fd-43de-9d1f-a332b04cb498',
      '3da79e8f-fa11-4196-84b8-904a44fe4a99',
      'b0b778f6-9deb-4d48-9b44-2fd8b0ca6b46'
    ]
  },
  {
    _id: 'c6ba9f0c-e9e6-4190-a834-115f10349196',
    first_name: 'Berry',
    last_name: 'Trainor',
    date_of_birth: '9/6/1975',
    hometownCity: 'Pasadena',
    hometownState: 'TX',
    books: [
      '21ed7160-27ec-486c-a64b-3601c0c96cfb',
      '346150e7-bf6f-481f-b555-c9ff760245f3',
      '1e2e87a3-d752-4065-896b-094da0403d2a',
      'fb2d3d4e-659f-437c-8dbd-0153a85109b8'
    ]
  },
  {
    _id: 'ba651cf2-8c94-459f-96f6-6a44aa62eb6f',
    first_name: 'Abbey',
    last_name: 'Youtead',
    date_of_birth: '6/9/1998',
    hometownCity: 'Salem',
    hometownState: 'OR',
    books: [
      'e8685ed3-2da0-43d4-ae93-22d1422fd303',
      'a6f03769-7030-4809-a11a-032719194968',
      '642e2de3-4bae-46ab-afd4-00593c3e8287',
      '5f787949-5365-4049-94c8-467cbd7b368d',
      'b3c3c778-21f1-40ac-9bba-4480fbec597e'
    ]
  },
  {
    _id: '66a2d10a-f895-4e93-9eb6-3abfa87bc211',
    first_name: 'Odille',
    last_name: 'Angelini',
    date_of_birth: '12/10/1913',
    hometownCity: 'New Orleans',
    hometownState: 'LA',
    books: [
      '7150e4e6-2caf-4790-9917-9dff53d5b1a3',
      'dd1f2723-95d3-4533-ae22-b7515911ad4c',
      '0d73b955-e519-4aa7-a360-a8996a1b52bf'
    ]
  },
  {
    _id: '681da636-7226-45cc-bb71-a7441690c4fb',
    first_name: 'Xavier',
    last_name: 'Englishby',
    date_of_birth: '11/26/1918',
    hometownCity: 'Oklahoma City',
    hometownState: 'OK',
    books: ['d0371af1-b952-4333-b4e7-e2a44e77eb6f']
  },
  {
    _id: 'b4a12c46-5eec-4d9c-9662-8a1234b0233b',
    first_name: 'Sarina',
    last_name: 'Bedford',
    date_of_birth: '12/18/1977',
    hometownCity: 'Santa Clara',
    hometownState: 'CA',
    books: ['50d61300-2207-4bca-9c93-192578183341']
  },
  {
    _id: 'cd241b6d-6c8b-4827-b2bd-979f238e8e5d',
    first_name: 'Hilde',
    last_name: 'Burgoine',
    date_of_birth: '5/12/1990',
    hometownCity: 'Shreveport',
    hometownState: 'LA',
    books: [
      'fd202505-c03f-4ad1-93c4-45baf476d7d9',
      'b102471c-7195-4030-ae7b-354ec1c0a55e'
    ]
  },
  {
    _id: '52829d96-d5e7-4f7d-ba95-236b12449a16',
    first_name: 'Freddy',
    last_name: 'Phinnis',
    date_of_birth: '10/31/1918',
    hometownCity: 'Milwaukee',
    hometownState: 'WI',
    books: [
      '4c2e7613-ca4e-4141-945d-ed63928dc3dd',
      'd248cc25-a0b5-4e51-99fc-92ed653a4415'
    ]
  },
  {
    _id: '6072fb46-42e3-4c32-9cc5-d11d1531a642',
    first_name: 'Gabey',
    last_name: 'Carbin',
    date_of_birth: '10/18/1920',
    hometownCity: 'Dallas',
    hometownState: 'TX',
    books: [
      'a0d5c70c-2133-4829-981a-48a9255da760',
      '55f81db4-cdb4-43c2-a11c-745e9abc408d',
      '48559ba2-bc53-4960-8115-8cbd9beafcf3'
    ]
  },
  {
    _id: 'dd55482e-139c-4afa-966d-f46bb097ae94',
    first_name: 'Marissa',
    last_name: 'Thridgould',
    date_of_birth: '9/26/1957',
    hometownCity: 'Rockville',
    hometownState: 'MD',
    books: []
  },
  {
    _id: 'd962a2d7-4656-450a-80bc-dc38aafb6407',
    first_name: 'Biddy',
    last_name: 'Loveman',
    date_of_birth: '10/26/1967',
    hometownCity: 'Sioux City',
    hometownState: 'IA',
    books: ['12c075f2-91d3-4b12-b3d3-0c71e8e08c86']
  },
  {
    _id: 'a67ed3f0-7253-4b50-bb1d-03a0372bd78b',
    first_name: 'Ronda',
    last_name: 'Disbury',
    date_of_birth: '9/19/1918',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: ['272c682a-6258-4ea0-812d-f7a815ab0285']
  },
  {
    _id: '1f65d08a-d59a-49fd-a511-31fef75f8280',
    first_name: 'Ansell',
    last_name: 'Mansuer',
    date_of_birth: '3/28/1953',
    hometownCity: 'Hollywood',
    hometownState: 'FL',
    books: ['53ce5bbc-80ee-4b80-8503-7bea9ca32d9b']
  },
  {
    _id: '57c2adb0-f534-4cf2-adf6-8350632fb271',
    first_name: 'Caz',
    last_name: 'Bullion',
    date_of_birth: '5/25/1968',
    hometownCity: 'Columbus',
    hometownState: 'OH',
    books: ['5e36e4d2-8d5c-44c6-bf94-d3386e2d6eb0']
  },
  {
    _id: '453f98ca-5bee-4400-ab0e-96796717496c',
    first_name: 'Marylee',
    last_name: "O'Mullaney",
    date_of_birth: '4/7/1920',
    hometownCity: 'Stockton',
    hometownState: 'CA',
    books: ['8a720958-2ccd-4239-b5e8-59082bbff23f']
  },
  {
    _id: 'a4bb2a05-b8a2-4476-9d0a-32f49cabd137',
    first_name: 'Avivah',
    last_name: 'Pendred',
    date_of_birth: '1/9/1929',
    hometownCity: 'Charlotte',
    hometownState: 'NC',
    books: [
      'a9c2f93a-db8e-4ffd-abd1-dbc0daca16fe',
      '7dc27b29-747f-46d9-bed3-8720e7cdd22b',
      'd12753cf-fdff-41e5-ba84-603bb21ef488'
    ]
  },
  {
    _id: '1b6f0c27-ab49-4783-a19a-9a8ab718292b',
    first_name: 'Constantia',
    last_name: 'Sambrook',
    date_of_birth: '8/22/2003',
    hometownCity: 'Suffolk',
    hometownState: 'VA',
    books: [
      '5a672a3b-b450-4170-b003-4baaff402776',
      '87911e99-24a1-4efc-b6ca-0b03e34ecb89'
    ]
  },
  {
    _id: 'c9b33d31-b1a0-425a-b2bc-fd9b08014a9f',
    first_name: 'Westley',
    last_name: 'Mathieu',
    date_of_birth: '7/17/1951',
    hometownCity: 'Des Moines',
    hometownState: 'IA',
    books: [
      'c7434ddc-fc70-4654-9659-212277180a05',
      '48f597f9-8bb8-4747-b2e0-8887de0eaafa',
      'a98d2c97-ef2e-4e83-a25f-949249223c66',
      'fed8023f-4900-4349-806b-8e0e3f46fefe'
    ]
  },
  {
    _id: '519bb91e-e170-46e3-96f6-a363ea30ff1d',
    first_name: 'Theodora',
    last_name: 'See',
    date_of_birth: '9/27/1982',
    hometownCity: 'Huntington',
    hometownState: 'WV',
    books: [
      '7b04d3b8-e07b-400a-9e3f-21c4f031a30d',
      'fb9e4e17-4e47-4a0a-8c1f-6be1427aa660',
      'dbc85e9f-525d-43bf-bd4e-13f2a581690c'
    ]
  },
  {
    _id: '7347a4e8-0b59-4e80-bfec-4e88281e9c8c',
    first_name: 'Delores',
    last_name: 'De Paepe',
    date_of_birth: '6/26/1918',
    hometownCity: 'San Jose',
    hometownState: 'CA',
    books: []
  },
  {
    _id: '4a817c42-ca8c-4be8-8df6-02e99b357a45',
    first_name: 'Lauryn',
    last_name: 'Rubinowitz',
    date_of_birth: '12/28/1904',
    hometownCity: 'Los Angeles',
    hometownState: 'CA',
    books: [
      '8d64715d-ee84-4a97-af85-2baa6180882e',
      '0a8d8de5-a446-4b13-8599-1d9b40e72d24',
      'eed2cc34-6840-4a1e-8f3e-223e202e8a71',
      '2ec4d80d-ea80-4a9f-900d-cfa60be0d8cb',
      '0d8eb4fc-c3f1-4468-a6b8-30aae5205c00'
    ]
  },
  {
    _id: 'da78d931-1396-40a5-b042-5a20ad83c80e',
    first_name: 'Averill',
    last_name: 'Ferie',
    date_of_birth: '2/4/1959',
    hometownCity: 'Charleston',
    hometownState: 'WV',
    books: [
      '98682279-52bc-4b64-829a-7ef5eb3815ed',
      '538c43b2-7cca-42ef-9838-a00f650a85bf',
      '2d2f3fd0-708f-4734-8831-cb156e22f2f8'
    ]
  },
  {
    _id: 'bb47464b-4413-468d-94f2-695d6850d825',
    first_name: 'Virgil',
    last_name: 'Bremmell',
    date_of_birth: '4/19/1920',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: ['39d45a5c-2b96-4c3b-8c2a-2a08fa6f2b76']
  },
  {
    _id: 'a029f0d8-1914-4e90-a842-8d68a9a130b8',
    first_name: 'Wolf',
    last_name: 'Ferier',
    date_of_birth: '1/10/1912',
    hometownCity: 'Los Angeles',
    hometownState: 'CA',
    books: ['9efd2451-58ee-4432-8cd1-0f31d022da02']
  },
  {
    _id: 'd8d43bcb-285b-492b-a3eb-d599563b6e8e',
    first_name: 'Libbie',
    last_name: 'Cordeiro',
    date_of_birth: '9/3/1902',
    hometownCity: 'Denton',
    hometownState: 'TX',
    books: [
      'f3eabffa-0ea9-48e2-b25d-2711c91a035e',
      '4b0ad9ec-2af5-4dd8-8b7e-e2e58e2889f8',
      '45d4e4e0-e4e8-4f08-9b00-83742067d5f7'
    ]
  },
  {
    _id: '322f4ba2-d557-4a40-91ea-332472cca331',
    first_name: 'Anastasie',
    last_name: 'Cockill',
    date_of_birth: '2/20/1913',
    hometownCity: 'Salt Lake City',
    hometownState: 'UT',
    books: []
  },
  {
    _id: '9033c926-fd23-42cd-ac47-7efb4863c52b',
    first_name: 'Bryanty',
    last_name: 'Instrell',
    date_of_birth: '12/15/1914',
    hometownCity: 'Seattle',
    hometownState: 'WA',
    books: []
  },
  {
    _id: 'f2e866e9-1707-477b-8130-8185445120b9',
    first_name: 'Paolina',
    last_name: 'Backler',
    date_of_birth: '6/15/1924',
    hometownCity: 'Sioux Falls',
    hometownState: 'SD',
    books: ['da380752-efb9-4598-8f8f-378c4311b312']
  },
  {
    _id: '28208705-64e2-4d51-8bef-c9d1fe00ff0d',
    first_name: 'Marijo',
    last_name: 'Yitzhak',
    date_of_birth: '6/13/1941',
    hometownCity: 'Portland',
    hometownState: 'OR',
    books: ['d3bbfce7-acdc-4ac1-9a30-a063fffbc305']
  },
  {
    _id: '0771dc5a-d9bc-4fe1-a488-b5c68a136c39',
    first_name: 'Adelheid',
    last_name: 'Huthart',
    date_of_birth: '4/5/1991',
    hometownCity: 'Fort Lauderdale',
    hometownState: 'FL',
    books: [
      '81f68534-5da0-4a02-bd55-d6bc65106452',
      '1e0fc9b7-646c-47c3-a189-be6da86ad171',
      '8ef1c996-5bcc-4565-ae03-ae0df4de5b01'
    ]
  },
  {
    _id: 'e6c1ab2a-0a17-4f6b-ae2c-397fc0373c33',
    first_name: 'Bordy',
    last_name: 'Scramage',
    date_of_birth: '7/21/1948',
    hometownCity: 'Atlanta',
    hometownState: 'GA',
    books: [
      '110d7f09-db00-476e-a417-568beb52ce6e',
      'c1131fa5-4210-4cf2-bf68-e499f5748913'
    ]
  },
  {
    _id: '4e3a47a8-a6db-4c2b-8ecb-45fc2fefaabf',
    first_name: 'Cristionna',
    last_name: 'Acory',
    date_of_birth: '1/6/1937',
    hometownCity: 'Atlanta',
    hometownState: 'GA',
    books: ['d2ac3c29-d7be-4c53-bc9e-db90cc3d7b92']
  },
  {
    _id: 'e9a62bce-c1ba-4664-8721-5f90a8640685',
    first_name: 'Mina',
    last_name: 'Vowell',
    date_of_birth: '11/15/1978',
    hometownCity: 'Bakersfield',
    hometownState: 'CA',
    books: ['1c671850-86fc-463e-9724-d9b95e7c5121']
  },
  {
    _id: '0563527e-813b-40b6-8333-1337f646f49e',
    first_name: 'Eloise',
    last_name: 'Brogini',
    date_of_birth: '12/15/1921',
    hometownCity: 'Kansas City',
    hometownState: 'MO',
    books: ['980e45f2-7040-4b76-9202-0c1c2ba7e8d6']
  },
  {
    _id: '6c5c2a7a-70ae-4d69-b786-b89391ea74fd',
    first_name: 'Filia',
    last_name: 'Joe',
    date_of_birth: '9/27/1906',
    hometownCity: 'Bonita Springs',
    hometownState: 'FL',
    books: ['fa4aba6c-6867-4ef8-ba2f-98bc0444c1d1']
  },
  {
    _id: 'a0b45428-5eee-42cf-bc8f-bd978c7b516d',
    first_name: 'Charlene',
    last_name: 'Henbury',
    date_of_birth: '9/11/1929',
    hometownCity: 'San Diego',
    hometownState: 'CA',
    books: [
      'ee7a3b0c-ce51-4dff-b713-48999e39ae17',
      '56dd5e55-1146-42ef-8553-2a2fe535aa22'
    ]
  },
  {
    _id: '86abb841-936f-4afe-bce9-73199f45565f',
    first_name: 'Hollie',
    last_name: 'Sievewright',
    date_of_birth: '4/3/1942',
    hometownCity: 'Pasadena',
    hometownState: 'CA',
    books: [
      'b3b12d88-c514-4a72-aa01-bc7e2dce17d6',
      '60b1b3e9-1bcc-469c-b725-5990cc43aa81',
      '437b6d7c-a75d-4c30-bc41-888c96f9da64',
      '7c0ebd45-8365-44fb-97c5-60b135b0fcb5'
    ]
  },
  {
    _id: '21bed63e-3da5-47db-aae9-83e49472a445',
    first_name: 'Carl',
    last_name: 'Goulbourn',
    date_of_birth: '11/11/1931',
    hometownCity: 'Austin',
    hometownState: 'TX',
    books: ['1443ee8f-29b6-4d13-bbd0-1cf466245ade']
  },
  {
    _id: 'a122a3ba-36c2-48d1-9014-83cd41e17953',
    first_name: 'Aristotle',
    last_name: 'Eckart',
    date_of_birth: '4/22/1914',
    hometownCity: 'Detroit',
    hometownState: 'MI',
    books: [
      '3740b1b0-ccca-4dd8-9278-43905b0022d4',
      'cbb27c50-4763-45a3-8bee-4b0dce334b31',
      '3a379e4e-d0e3-47fe-b088-52bc4d6fceb0',
      'fc09a0e5-84d1-412c-854f-3da02ee839fc'
    ]
  },
  {
    _id: '0bbf8a21-3237-4951-9035-efd68a0b05bd',
    first_name: 'Jeremie',
    last_name: 'Terbruggen',
    date_of_birth: '4/4/1976',
    hometownCity: 'Erie',
    hometownState: 'PA',
    books: [
      '357e776a-307a-4936-af2c-81339cb8bf5e',
      '84634236-0abc-4956-8496-84b590e57634',
      '9bb1d7ea-3a41-4e86-a4d1-3b670aef0329'
    ]
  },
  {
    _id: '0e603c9b-8801-48fe-95ec-312096990ca8',
    first_name: 'Cal',
    last_name: 'Carbry',
    date_of_birth: '6/9/1944',
    hometownCity: 'Pittsburgh',
    hometownState: 'PA',
    books: [
      '16b1f054-ea03-4420-9ba7-6d818c5b213e',
      '59009b66-45b0-4eaf-bb08-e5ff1b8568dc',
      'a94cd8e8-3edd-4e4a-8ed6-03a4319dd273'
    ]
  },
  {
    _id: '3b8b056c-ee3d-4e73-9db6-e01e771d6718',
    first_name: 'Kenneth',
    last_name: 'McEvoy',
    date_of_birth: '1/16/2004',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: ['a7e3efa1-444a-410b-8c31-990b711e4761']
  },
  {
    _id: 'def768fc-5cdb-4222-acb5-b14ce8f4083f',
    first_name: 'Carlie',
    last_name: 'Powys',
    date_of_birth: '2/16/1944',
    hometownCity: 'Sacramento',
    hometownState: 'CA',
    books: [
      'fc609fc6-1503-47dc-8f27-0e55c2226e8c',
      '9a8b817b-af91-44bc-b7b6-8f38129fe497'
    ]
  },
  {
    _id: '873497f1-d973-4516-9da1-18bc913c26a0',
    first_name: 'Audi',
    last_name: 'Wellum',
    date_of_birth: '10/22/1974',
    hometownCity: 'Fargo',
    hometownState: 'ND',
    books: [
      '8b50a27c-53fb-4eab-8478-51132f63555f',
      '22587d23-84cd-4954-87b7-cd5ba648034a'
    ]
  },
  {
    _id: 'd20d4350-ffc6-4125-959e-7a0e6b0480c4',
    first_name: 'Ruttger',
    last_name: 'Pascall',
    date_of_birth: '4/22/1971',
    hometownCity: 'Pittsburgh',
    hometownState: 'PA',
    books: [
      '290f1538-552c-4dc7-bdc4-1bd8d1e979e7',
      '6cf2acfd-c3e9-4573-b5fd-7164e2edfc31',
      'd4c13f09-27f5-4923-ba01-0f125cd58581'
    ]
  },
  {
    _id: '724eec89-1af5-414a-b899-c286032fbba3',
    first_name: 'Wyatan',
    last_name: 'Maskall',
    date_of_birth: '6/19/1930',
    hometownCity: 'Fresno',
    hometownState: 'CA',
    books: [
      'b33a3355-d5c0-4634-ba2a-2d129c133ab0',
      '42235695-d83a-459d-b027-6d0df53d6523'
    ]
  },
  {
    _id: '7cdbc5ad-12b8-428d-9ab8-57d117328403',
    first_name: 'Cheryl',
    last_name: 'Borsay',
    date_of_birth: '12/3/1966',
    hometownCity: 'San Jose',
    hometownState: 'CA',
    books: [
      'aad59f1c-0c70-46f8-ac71-0b397f711e01',
      '05490a8d-6a72-429c-994d-0498117f6a34',
      '28f5939e-aacd-447a-ab4c-6f94f27f7190',
      'f718260f-8911-473b-8f02-78240066ea4b'
    ]
  },
  {
    _id: 'f8ebaa16-3a02-4cb7-8710-2f4839d32590',
    first_name: 'Waylan',
    last_name: 'McDonnell',
    date_of_birth: '8/6/1961',
    hometownCity: 'Biloxi',
    hometownState: 'MS',
    books: ['aad4207c-3eaf-4d51-b509-8d514a3a8802']
  },
  {
    _id: '9ab6487c-31f9-4b8f-8010-b6104fff041b',
    first_name: 'Shel',
    last_name: 'Mountstephen',
    date_of_birth: '10/17/1924',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: [
      '3d46a739-fd92-4ff5-9bf3-95da90d22f66',
      '424f10ec-7e52-4f2c-9270-884b89eca495',
      '3d4d14a9-3514-4088-87cb-0202c2a4527d',
      'cbf68500-e102-47b4-9728-045656e47def'
    ]
  },
  {
    _id: '32666108-ded7-46e9-abef-7e1c58204177',
    first_name: 'Kirsteni',
    last_name: 'Blench',
    date_of_birth: '5/11/2003',
    hometownCity: 'White Plains',
    hometownState: 'NY',
    books: [
      'ec34cbcf-ccd2-4902-864e-8d68f3647e01',
      'd042887f-f235-464a-8094-f61b3372ac1d'
    ]
  },
  {
    _id: '8894c41b-2435-4a92-b513-a385163429e7',
    first_name: 'Gay',
    last_name: 'Tebboth',
    date_of_birth: '10/11/2001',
    hometownCity: 'Anchorage',
    hometownState: 'AK',
    books: ['b4e9ed2c-a072-45a2-8d53-65155d624865']
  },
  {
    _id: '6ab3212d-2186-412c-895f-98fa05b23290',
    first_name: 'Elvin',
    last_name: 'Walisiak',
    date_of_birth: '6/15/1926',
    hometownCity: 'Charleston',
    hometownState: 'WV',
    books: ['76bf3af3-6c2b-429a-804e-85678d30cd31']
  },
  {
    _id: 'a4946a28-af9a-4278-841f-cda842dcf4e2',
    first_name: 'Ettore',
    last_name: 'Barg',
    date_of_birth: '12/8/1902',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: ['f2c3e6f5-c4c8-436a-b7c6-8309708bb9f1']
  },
  {
    _id: '811e02d4-f4d5-4b14-8a89-04af4c5df108',
    first_name: 'Sharl',
    last_name: 'Pickwell',
    date_of_birth: '12/22/1901',
    hometownCity: 'Dallas',
    hometownState: 'TX',
    books: ['b3a2ad92-d953-415a-b5dc-44a3dac11548']
  },
  {
    _id: '68485131-aadd-4e22-a2b7-bd39977e2949',
    first_name: 'Terrell',
    last_name: 'Godbolt',
    date_of_birth: '6/14/1969',
    hometownCity: 'Indianapolis',
    hometownState: 'IN',
    books: ['98d3872c-67f2-4192-ab8e-e7686c58ced6']
  },
  {
    _id: '64404e92-0886-4e7a-9fbf-d7c3e66c8c01',
    first_name: 'Eleanora',
    last_name: 'Batting',
    date_of_birth: '8/4/1948',
    hometownCity: 'Spring',
    hometownState: 'TX',
    books: [
      '323837d7-88db-4056-a573-5808538e9d2d',
      'afa9dae5-7b5c-4e7c-8b2b-3ca787bc33c5',
      'c9371fba-ad5b-4fc9-ae92-99eeee594b2c'
    ]
  },
  {
    _id: '8a45e2c9-90a7-4873-a839-0a7f63f0d4e4',
    first_name: 'Vachel',
    last_name: 'Belsham',
    date_of_birth: '12/29/1953',
    hometownCity: 'Garland',
    hometownState: 'TX',
    books: [
      'eb2d7ebb-8dd8-4271-9847-d7305f9d0814',
      'fb02ddc3-c832-4b03-a8ed-99bec1a6b2c0'
    ]
  },
  {
    _id: 'b37b38df-b0ab-4a59-baf0-96e6f9a788c4',
    first_name: 'Kleon',
    last_name: 'Buse',
    date_of_birth: '9/2/1945',
    hometownCity: 'Fresno',
    hometownState: 'CA',
    books: ['f9d95180-2446-4d38-9590-599551de3333']
  },
  {
    _id: '1de13141-3f8c-45be-ba28-ca1eee2aea37',
    first_name: 'Lilas',
    last_name: 'Caswall',
    date_of_birth: '1/10/1913',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: ['a300d2a5-24b1-4494-9aae-8bf170503ae4']
  },
  {
    _id: 'b9a1842d-fa65-4f2e-b76d-eb8d8bce75ef',
    first_name: 'Irving',
    last_name: 'McClements',
    date_of_birth: '4/25/1987',
    hometownCity: 'Birmingham',
    hometownState: 'AL',
    books: [
      '24ad22d8-110e-4546-9197-41e6573b282b',
      'e032bb91-4a59-466e-b50d-ca5f661a20d0'
    ]
  },
  {
    _id: 'c4fab3c3-e39c-4705-afe3-f3db0a3e141c',
    first_name: 'Osmond',
    last_name: 'Oldall',
    date_of_birth: '5/19/1959',
    hometownCity: 'Hattiesburg',
    hometownState: 'MS',
    books: [
      '2f4bf765-e238-422d-bfb9-a7a40897d5b0',
      '7658ab4d-5d56-44d2-920e-751c1500e99c'
    ]
  },
  {
    _id: '69bdec28-9332-41bd-b174-a1ea7ec55e20',
    first_name: 'Henriette',
    last_name: 'Valentetti',
    date_of_birth: '5/8/1979',
    hometownCity: 'Honolulu',
    hometownState: 'HI',
    books: []
  },
  {
    _id: 'adcbf3b1-711c-4e9d-a557-24473b20ce0d',
    first_name: 'Clarance',
    last_name: 'Derby',
    date_of_birth: '1/2/1987',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: []
  },
  {
    _id: '928f9b9d-0b71-4aff-a971-6ba47a2428d0',
    first_name: 'Harlene',
    last_name: 'Blooman',
    date_of_birth: '1/18/1913',
    hometownCity: 'Greensboro',
    hometownState: 'NC',
    books: ['341f8b86-51e6-4470-91e6-9841f6ef04ee']
  },
  {
    _id: '63a2a9d6-1f33-449c-8ea7-44a19f9a4f93',
    first_name: 'Ivory',
    last_name: 'Daville',
    date_of_birth: '8/14/1913',
    hometownCity: 'Henderson',
    hometownState: 'NV',
    books: [
      'd337cf67-a121-48aa-a29e-1a2237de1cce',
      '92b2a991-bb3b-4393-a732-1c8518115ed4',
      'dbaee7af-9373-4307-a1ae-9f590ae75e4c'
    ]
  },
  {
    _id: 'ad923796-1ad6-4a1d-88b6-454a04412573',
    first_name: 'Jordan',
    last_name: 'Stobbart',
    date_of_birth: '11/10/1903',
    hometownCity: 'Chicago',
    hometownState: 'IL',
    books: [
      'e7de5428-c687-43e9-9793-f1ad55445838',
      'ec9775d4-10c0-46e8-aea6-cfca51071763',
      'c648cd45-35ca-459d-b79a-0e51c1959320',
      '81af82d6-7cdb-4e14-b53f-4980832efaaf',
      'd73427d1-59b4-4bc2-aef0-0c6ae5503399',
      '4565a90d-8d77-457e-aab4-a37e4312c3c6'
    ]
  },
  {
    _id: '0a271c3c-9919-4c8a-8261-c9f7336695bd',
    first_name: 'Drusy',
    last_name: 'Lamperd',
    date_of_birth: '4/26/1946',
    hometownCity: 'Bakersfield',
    hometownState: 'CA',
    books: [
      '8d08d534-bf38-4fe1-8372-29c35d856d73',
      '9ad146be-a5ec-459a-9d3c-1e8b6091804e'
    ]
  },
  {
    _id: 'c9abbdca-433f-4e84-89cb-dc1b07e01204',
    first_name: 'Alonso',
    last_name: 'McTavish',
    date_of_birth: '9/15/1990',
    hometownCity: 'Brooklyn',
    hometownState: 'NY',
    books: ['fb69c58d-8e11-4dd1-961f-beae1bec92c4']
  },
  {
    _id: '75c77358-69d9-41f8-b6d1-760267ee7ebe',
    first_name: 'Waylan',
    last_name: 'Disley',
    date_of_birth: '7/4/1928',
    hometownCity: 'Charlottesville',
    hometownState: 'VA',
    books: [
      '0464d2cf-d5b2-4087-bbef-db9eda7300cf',
      'cd2ff008-dddb-4521-8035-fab1e5bd8218',
      '0e3ed0cb-723f-48c3-84b3-e17e004c8d0a',
      '190453de-62dc-4320-8761-e49c027610da'
    ]
  },
  {
    _id: '42a05da0-4cd2-4da0-947e-f10c08f9abb6',
    first_name: 'Vere',
    last_name: 'Bott',
    date_of_birth: '10/11/1916',
    hometownCity: 'Seattle',
    hometownState: 'WA',
    books: []
  },
  {
    _id: 'e28b330a-5374-4b87-83a6-81a691a7318e',
    first_name: 'Gisela',
    last_name: 'Treagus',
    date_of_birth: '6/21/1970',
    hometownCity: 'Las Cruces',
    hometownState: 'NM',
    books: []
  },
  {
    _id: '745afd57-6c27-41b6-8e24-e7db2f77ba4b',
    first_name: 'Raine',
    last_name: 'Clotworthy',
    date_of_birth: '8/28/1972',
    hometownCity: 'Boston',
    hometownState: 'MA',
    books: [
      '971cc2a0-859b-47f3-ac0f-13c4af46390c',
      'ee3eb33d-f0a7-4fe2-a7be-e0ae130aa83f'
    ]
  },
  {
    _id: '0b5c7c70-f14f-4ee2-ab72-bcfc0281c97f',
    first_name: 'Franciskus',
    last_name: 'Farrant',
    date_of_birth: '9/7/1951',
    hometownCity: 'Tulsa',
    hometownState: 'OK',
    books: [
      'fb5567d5-5957-413f-931e-eedd075cb1e9',
      '93cb94e5-728a-4a3b-8830-4e9e6fea2908',
      'a6c7c1c2-fb1c-45c9-9c0d-24de5c19d209',
      'd9546cf2-1584-4309-a83d-2c9d7bc53533'
    ]
  },
  {
    _id: 'f431e6e4-bdc2-4500-9eec-c5340bbb4881',
    first_name: 'Teddie',
    last_name: 'Coleford',
    date_of_birth: '10/19/1947',
    hometownCity: 'Norfolk',
    hometownState: 'VA',
    books: []
  },
  {
    _id: '894a5194-2a84-4d7e-9dde-89cc6664f50b',
    first_name: 'Rubin',
    last_name: 'Gorrie',
    date_of_birth: '12/13/1947',
    hometownCity: 'Brooklyn',
    hometownState: 'NY',
    books: []
  },
  {
    _id: '339b2ea7-982b-4b3c-be95-5450a0c5f865',
    first_name: 'Devy',
    last_name: 'Tewes',
    date_of_birth: '6/3/1911',
    hometownCity: 'Bakersfield',
    hometownState: 'CA',
    books: ['d05a3185-3e22-4a7f-b164-81ad3bebc1e2']
  },
  {
    _id: '74de41dc-31c4-4b95-b411-0b7b504c79e8',
    first_name: 'Rita',
    last_name: 'Zohrer',
    date_of_birth: '12/16/1930',
    hometownCity: 'Monticello',
    hometownState: 'MN',
    books: ['3d99f19a-7fc0-47f1-ae0a-b040a588e80f']
  },
  {
    _id: '3d5cddce-4406-4073-9164-07910750ab76',
    first_name: 'Rose',
    last_name: 'Coldman',
    date_of_birth: '3/12/1988',
    hometownCity: 'Raleigh',
    hometownState: 'NC',
    books: [
      '3fa1b437-4978-44fe-b382-8c8d3ea6d310',
      '72d62758-a5b6-4610-950a-99173b2f9732',
      '428055e0-e909-4189-b3d4-ed05db5866c6',
      '12d089ab-f6d5-4a8a-8233-32826fde5468'
    ]
  },
  {
    _id: '434e8f61-3e3a-4c8a-85fc-1224950998b7',
    first_name: 'Felicdad',
    last_name: 'Watkiss',
    date_of_birth: '5/11/1900',
    hometownCity: 'Roanoke',
    hometownState: 'VA',
    books: [
      '0f72146c-86c8-4125-872a-f2ac55d2251f',
      'ce1ee860-147b-4851-b187-ce8f81789bcd'
    ]
  },
  {
    _id: '79c78869-f315-46e3-a736-f12824759680',
    first_name: 'Thedric',
    last_name: 'Myford',
    date_of_birth: '2/9/1913',
    hometownCity: 'Portland',
    hometownState: 'OR',
    books: ['b0b70bff-2a5a-49a4-a0ec-400fb6ca8e72']
  },
  {
    _id: 'ba0095b7-6e65-43cd-939a-4d60d76c10df',
    first_name: 'Delcine',
    last_name: 'Osmund',
    date_of_birth: '5/8/1932',
    hometownCity: 'Dayton',
    hometownState: 'OH',
    books: [
      '0155481d-6b3f-4395-a062-c43a4bad9fa6',
      'b7a39969-9774-494d-b58f-faaaffd3b7fc',
      '2eb84e6e-903e-409f-adb1-376b10771644'
    ]
  },
  {
    _id: 'ab02e951-4cf9-4b1c-89fd-752079f39ef3',
    first_name: 'Nevins',
    last_name: 'Bricham',
    date_of_birth: '10/20/1900',
    hometownCity: 'Troy',
    hometownState: 'MI',
    books: [
      '0ff64f74-f01d-4c62-a071-9ea36508f5c6',
      '7bfe3bd7-e865-4cf9-ae6e-b6caec44d31b',
      '337d7071-e19d-474d-99d1-401961072b8a'
    ]
  },
  {
    _id: '72b50da8-f16d-4712-8523-b2ba089bd0bd',
    first_name: 'Eulalie',
    last_name: 'Greenland',
    date_of_birth: '9/26/1922',
    hometownCity: 'Bradenton',
    hometownState: 'FL',
    books: [
      'eca41e7f-d5a8-46ce-bbde-574097e5e53d',
      'f263541c-d0ca-448f-ba72-5ea770b64ca2'
    ]
  },
  {
    _id: '11dd75aa-0e99-46cb-aa54-de092bdc7365',
    first_name: 'Minor',
    last_name: 'Seddon',
    date_of_birth: '8/24/1912',
    hometownCity: 'Atlanta',
    hometownState: 'GA',
    books: [
      '06168eaf-a803-440d-a76a-dddc0402b361',
      'e38ee52b-f3e8-4abf-b759-994f002bb1e6'
    ]
  },
  {
    _id: '3d5ea1f5-a929-47c0-b92d-b6192fa7ad1e',
    first_name: 'Carlita',
    last_name: 'Fleay',
    date_of_birth: '1/20/1905',
    hometownCity: 'San Francisco',
    hometownState: 'CA',
    books: [
      '49152a05-3a48-4cb5-b15a-4f6146fed803',
      '13047538-818c-4c30-905d-e8ef026f47b1',
      '3509feff-8dff-4564-9f76-f1150693845a'
    ]
  },
  {
    _id: '743f2a28-1071-4335-b437-d642588927ab',
    first_name: 'Hervey',
    last_name: 'Hanstock',
    date_of_birth: '1/25/1906',
    hometownCity: 'Springfield',
    hometownState: 'MA',
    books: ['066ba7f9-9297-45cb-83fd-61312fab431e']
  },
  {
    _id: '3e4f3efe-2514-4846-bedb-6c7c86df9b80',
    first_name: 'Colas',
    last_name: 'Croot',
    date_of_birth: '11/7/1999',
    hometownCity: 'Huntington',
    hometownState: 'WV',
    books: [
      '15acd61c-d718-4d28-9715-bfa6d301fe43',
      '88a227b6-c454-4925-be65-d5f63a7b3856',
      '6c061392-7488-4693-a581-1a0586e28ed1'
    ]
  },
  {
    _id: '51e0eb6e-7d43-4fd3-8f15-671bb4da1d05',
    first_name: 'Pavlov',
    last_name: 'Gueny',
    date_of_birth: '8/20/1945',
    hometownCity: 'Huntsville',
    hometownState: 'AL',
    books: [
      'b25fd534-7b3c-4a79-a416-98eb525315f7',
      'c7d6360d-63e7-4e00-90b0-985b50a709aa',
      'e25e4897-0744-477a-86f7-8159b8244f3b',
      '09c3f85b-1511-4029-b23c-3b32466ae12b'
    ]
  },
  {
    _id: 'db0ed7cc-2cf0-4b33-a947-87ab8204c339',
    first_name: 'Hynda',
    last_name: 'Schlagh',
    date_of_birth: '9/14/1925',
    hometownCity: 'San Francisco',
    hometownState: 'CA',
    books: []
  },
  {
    _id: 'cbedd8fb-20a2-46e8-bb26-60e431871f15',
    first_name: 'Tommy',
    last_name: 'Klemenz',
    date_of_birth: '2/1/1921',
    hometownCity: 'Los Angeles',
    hometownState: 'CA',
    books: []
  },
  {
    _id: 'bae5536c-ae91-477f-a7eb-bcd11873baaf',
    first_name: 'Shalne',
    last_name: 'Yurygyn',
    date_of_birth: '11/14/1939',
    hometownCity: 'Lubbock',
    hometownState: 'TX',
    books: [
      '0ed8172f-88c8-4dd1-893d-b164b63964b8',
      '0b39742b-8ad1-4db3-8de3-f66e82404666',
      '77ab2171-7532-4d4f-8205-743e49ef93ee'
    ]
  },
  {
    _id: '963cf4e5-5093-404c-bab8-92a74a1a9ba6',
    first_name: 'Merci',
    last_name: 'Westphal',
    date_of_birth: '7/27/1944',
    hometownCity: 'Cumming',
    hometownState: 'GA',
    books: [
      '95e2e8a5-96d7-459f-9d56-55213e4dc173',
      'd5570ddc-de52-46b3-807d-9ae59d6bb76b',
      'b375fdea-2f74-4414-8e16-651f44f9338b',
      'cdb74424-6d56-44b3-bd54-c983722d8d8a'
    ]
  },
  {
    _id: 'de267c83-3c12-44a1-b786-a8afea541bbd',
    first_name: 'Berri',
    last_name: 'Clarage',
    date_of_birth: '12/16/1932',
    hometownCity: 'Birmingham',
    hometownState: 'AL',
    books: [
      'c150a0f6-7b82-4229-912c-b9d81d5a184a',
      '948347d5-8a4e-4335-b5d0-9914597b6d97',
      'caf12856-d93a-4ec2-9d2a-af5f666b389c'
    ]
  },
  {
    _id: '1f5a200e-ebad-4ea8-b113-266f7ad826cd',
    first_name: 'Rena',
    last_name: 'Ilem',
    date_of_birth: '9/4/1908',
    hometownCity: 'Fort Worth',
    hometownState: 'TX',
    books: ['ac3fbb76-1508-44b1-8937-757de003ddbf']
  },
  {
    _id: '68f54c33-c8be-4cc9-a372-3bd9e0fe22b5',
    first_name: 'Orion',
    last_name: 'Godspede',
    date_of_birth: '10/21/1902',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: []
  },
  {
    _id: '129b38ff-1721-4937-aaf5-634e4ddc8926',
    first_name: 'Willey',
    last_name: 'Stainsby',
    date_of_birth: '12/3/1914',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: []
  },
  {
    _id: '60456bcb-a2b8-405f-8245-69e4b17a183e',
    first_name: 'Carmela',
    last_name: 'Riseam',
    date_of_birth: '10/19/1912',
    hometownCity: 'Detroit',
    hometownState: 'MI',
    books: [
      '28c9a6b1-2ae2-4811-b15f-dd78b63b9033',
      '34bdf370-8162-4d83-88d4-f01cc0dc715d',
      '6051c3ce-8ce3-44d9-96e5-ed11b2d00d09'
    ]
  },
  {
    _id: '9c8568f1-4fdc-410d-b0ad-eff71ced0abe',
    first_name: 'Mathilda',
    last_name: 'MacGee',
    date_of_birth: '2/21/1961',
    hometownCity: 'Kissimmee',
    hometownState: 'FL',
    books: [
      '9be9c068-9dba-46a9-92d0-e2d9d6b3e96f',
      '0c1c0aba-7f97-486f-8188-f4dfcb3bac32',
      '637a2895-faf9-4ff6-8aa2-df7e11d99527'
    ]
  },
  {
    _id: 'df51dbe5-1edf-4c38-87ca-54b0d2e48ba6',
    first_name: 'Pedro',
    last_name: 'Gamet',
    date_of_birth: '1/1/1902',
    hometownCity: 'Columbus',
    hometownState: 'MS',
    books: []
  },
  {
    _id: '3f8bf018-4b09-4f9d-8206-e079ad314a46',
    first_name: 'Pris',
    last_name: 'Osmond',
    date_of_birth: '5/20/1902',
    hometownCity: 'South Bend',
    hometownState: 'IN',
    books: [
      '519c733a-6a5d-451f-927d-0e860b5d1e3d',
      '9e8aef40-a7fb-4a80-8f7d-b87a5c085288',
      '783f4e9d-cc9d-4bc1-884d-b217810d8c3f'
    ]
  },
  {
    _id: '31c046f8-81ec-4d6d-a198-aff829899713',
    first_name: 'Maegan',
    last_name: 'Mariolle',
    date_of_birth: '9/3/1961',
    hometownCity: 'Cincinnati',
    hometownState: 'OH',
    books: ['7f3ce70e-5dba-408b-afa3-5c948e13a2f0']
  },
  {
    _id: '0b03307a-f793-4582-8d86-aac321101db3',
    first_name: 'Basilio',
    last_name: 'Cheverell',
    date_of_birth: '10/15/1955',
    hometownCity: 'Lansing',
    hometownState: 'MI',
    books: ['f8c50165-b893-4f03-9fac-22244ed3f332']
  },
  {
    _id: '9e447a26-aaaa-41e6-bb04-241b552dcbbc',
    first_name: 'Agretha',
    last_name: 'Saltwell',
    date_of_birth: '11/24/1908',
    hometownCity: 'Columbus',
    hometownState: 'OH',
    books: [
      '2e5e554c-dbc2-494c-827b-ed4cbb9e54e5',
      '41f9bfb8-8252-470e-be0b-99ee39a41382',
      'b91aa740-6355-4008-a69f-2a4554c5a2e3'
    ]
  },
  {
    _id: '59d00508-ed3b-44ec-ab33-6629eff4c5ae',
    first_name: 'Thacher',
    last_name: 'Saphin',
    date_of_birth: '11/4/1932',
    hometownCity: 'Providence',
    hometownState: 'RI',
    books: [
      '918e6e35-5681-4f92-a636-1a2a34e9cc67',
      '7229c353-e88e-45b7-99e8-567810f28432',
      'ec75116f-a7c6-45b6-b25f-0cc5441da031',
      'edfb90d3-a4ee-49fe-b3a3-e41671965f5d'
    ]
  },
  {
    _id: '83a8878d-d10e-4c3d-adc5-ed88487d1888',
    first_name: 'Deanna',
    last_name: 'Cham',
    date_of_birth: '2/9/1914',
    hometownCity: 'Salt Lake City',
    hometownState: 'UT',
    books: [
      '9df2d732-5d9f-4a9d-a9df-64e12a20d7db',
      'b261d2d4-11c9-44b4-95de-31bc22de27f5',
      'ed48d529-8e22-434e-8fc8-7b2d357f8058'
    ]
  },
  {
    _id: '669c00a3-ff8b-4fb6-a913-f6bd5739a5b1',
    first_name: 'Marybelle',
    last_name: 'Ealam',
    date_of_birth: '3/2/1925',
    hometownCity: 'York',
    hometownState: 'PA',
    books: [
      '6f2309f9-bfd2-4314-b191-637aa6e825b9',
      'f45c37d4-9887-4477-95e9-9d3a1aee8959',
      'f3d07d72-10aa-4bb1-b822-48beba6da387',
      '6e1c66e8-b120-4e22-bc77-1e91b837051e',
      '1d7cf7ca-7883-47cb-907b-8f65f2dd9e12'
    ]
  },
  {
    _id: '00296062-6b0d-4f54-aa58-14597d3475c8',
    first_name: 'Cece',
    last_name: 'Moquin',
    date_of_birth: '5/20/1982',
    hometownCity: 'Arlington',
    hometownState: 'VA',
    books: [
      '94bfc449-02a1-45e3-9b5a-3db466c0e39d',
      'c41fce0c-8f1c-41ed-972e-6a3b3454f03d'
    ]
  },
  {
    _id: 'fc1068d1-310e-4fe3-8bb0-175e7010d66c',
    first_name: 'Waite',
    last_name: 'Karpfen',
    date_of_birth: '7/14/1936',
    hometownCity: 'Decatur',
    hometownState: 'IL',
    books: [
      '28bc73e8-8c20-4f76-98b6-12a33c3ad821',
      'c6640c50-3bb2-420d-bd06-f016be397e4e'
    ]
  },
  {
    _id: '9e62336d-16ab-4b93-8f11-158b94049da3',
    first_name: 'Had',
    last_name: 'Cracknell',
    date_of_birth: '7/19/1926',
    hometownCity: 'Portsmouth',
    hometownState: 'VA',
    books: ['a4d6a476-4d62-4902-b578-be9215f2064c']
  },
  {
    _id: '9429d241-0840-43d1-9e30-c4e2597759a6',
    first_name: 'Lorita',
    last_name: 'Yurshev',
    date_of_birth: '9/29/1909',
    hometownCity: 'Raleigh',
    hometownState: 'NC',
    books: ['a9ba7156-8879-4d5f-9205-57da11c0e965']
  },
  {
    _id: '82d64c87-69d0-4e72-935f-7c06e5368ed5',
    first_name: 'Eudora',
    last_name: 'Dunthorn',
    date_of_birth: '6/8/1974',
    hometownCity: 'Springfield',
    hometownState: 'IL',
    books: ['4974ecba-2b51-45ec-aee3-431dacdb57e9']
  },
  {
    _id: 'de2ce351-11a6-4425-92d6-e51a7f546a7b',
    first_name: 'Neron',
    last_name: 'Emmines',
    date_of_birth: '1/4/1959',
    hometownCity: 'Billings',
    hometownState: 'MT',
    books: [
      '5a7065ee-876f-433c-9344-2b32f4b4b672',
      'd621bcfd-1f38-433b-bca2-84ebf12b32e9',
      '30772fd6-98d5-4a75-9f40-aaf9f6a7514b',
      'b4c38d5e-5142-48da-9446-186d3b1a3988'
    ]
  },
  {
    _id: '4de7f77b-dad4-4c05-af13-24f2b1dd4914',
    first_name: 'Axe',
    last_name: 'Preble',
    date_of_birth: '6/18/1988',
    hometownCity: 'Charleston',
    hometownState: 'SC',
    books: [
      '569813c2-237e-4879-a5dc-bf5441d91fd5',
      '1ac7be25-51ef-472c-82dc-322ccea7495c',
      '1c54b523-9868-41fa-9635-dbe892410989',
      'dd0523fa-520b-4e26-930b-4f90e288aa2b'
    ]
  },
  {
    _id: '8222b095-01c0-46a7-8b2d-e08cbd234556',
    first_name: 'Fidelia',
    last_name: 'Tirone',
    date_of_birth: '5/10/1952',
    hometownCity: 'Charlotte',
    hometownState: 'NC',
    books: []
  },
  {
    _id: '0e517eed-b418-4bb0-8ee7-7f0e4b2f5232',
    first_name: 'Tammi',
    last_name: 'Pavkovic',
    date_of_birth: '7/29/1927',
    hometownCity: 'Jersey City',
    hometownState: 'NJ',
    books: []
  },
  {
    _id: 'd0ec5aa2-8d3a-41e9-a1f0-cdb3d303eeea',
    first_name: 'Colly',
    last_name: 'Noods',
    date_of_birth: '9/5/1925',
    hometownCity: 'Mobile',
    hometownState: 'AL',
    books: [
      '24bbf8d8-62d1-43a4-9af8-6e0ddbc14254',
      '65f3a805-5024-474f-b889-e61daae19df5'
    ]
  },
  {
    _id: '1cf7e66d-5270-4763-b49a-1631caa80745',
    first_name: 'Kurt',
    last_name: 'Hughesdon',
    date_of_birth: '5/7/2000',
    hometownCity: 'Miami',
    hometownState: 'FL',
    books: [
      '6bbb6f04-77c7-4a63-ae5a-c6885551cd04',
      'beca8bf9-2a56-4d39-8a99-1775894c9610'
    ]
  },
  {
    _id: '6820b8ea-62b0-4da3-a23f-cf246fd8a034',
    first_name: 'Hartwell',
    last_name: 'Inglese',
    date_of_birth: '6/20/1930',
    hometownCity: 'Tulsa',
    hometownState: 'OK',
    books: []
  },
  {
    _id: '19534886-099f-4d68-80dd-2af35eeaf5e7',
    first_name: 'Cristina',
    last_name: 'Fettiplace',
    date_of_birth: '9/9/1944',
    hometownCity: 'Albany',
    hometownState: 'NY',
    books: []
  },
  {
    _id: '145e6abe-f17b-477a-b5d6-9468c69df8b4',
    first_name: 'Lindie',
    last_name: 'Braine',
    date_of_birth: '2/5/1944',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: [
      '2157fa34-6f10-497f-84ff-48fa74c3ea5a',
      'b636b0a2-e864-4e05-af63-59e21e41be69',
      '7dd79318-dda0-4fe4-bebe-eed94e900bab'
    ]
  },
  {
    _id: 'f8663cff-35e8-48e3-ad3e-07aff658083d',
    first_name: 'Laurie',
    last_name: 'Oen',
    date_of_birth: '8/8/1903',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: ['9d592661-fc95-44a2-9d17-bbc19bfb2bb7']
  },
  {
    _id: 'baae4ea0-b53b-41e5-9286-a6b8c7db1fea',
    first_name: 'Winny',
    last_name: 'Fewell',
    date_of_birth: '5/7/1967',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: []
  },
  {
    _id: 'b1fa1dd5-1ac3-4812-86e7-394b18e8bb7c',
    first_name: 'Kalinda',
    last_name: 'Broxup',
    date_of_birth: '9/20/1962',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: [
      '1f8ebc58-d903-4c14-9d9b-414464418e0b',
      '10d945d9-3fc0-4b3a-a13f-8de8a7e9a8d1',
      '82ff082e-78c7-41ce-a7a4-f9afaa7c0e17'
    ]
  },
  {
    _id: 'e1f96db2-1e3f-4423-a896-6e81b6619653',
    first_name: 'Lacee',
    last_name: 'Mant',
    date_of_birth: '1/17/1934',
    hometownCity: 'Tucson',
    hometownState: 'AZ',
    books: [
      '21ec8137-1ab4-4df7-8026-3fee8cb502c8',
      'd7ad2e08-6c46-4769-baa3-391054fdbd75',
      '707c5253-619f-4cfa-88fc-00b7e651f8d7',
      '67203720-17c3-40e5-8bcf-c1cafc0bcc5b',
      '88eb978a-8bc7-4d37-afa4-f94dfdb8f6fa'
    ]
  },
  {
    _id: 'cd66289a-dd71-4130-b2bc-19723cf0fa08',
    first_name: 'Tonya',
    last_name: 'Loyndon',
    date_of_birth: '10/27/1915',
    hometownCity: 'Sacramento',
    hometownState: 'CA',
    books: [
      '04e55bc9-0c7a-47a6-a403-52eabf25c6ef',
      'dfd5f527-f65b-409a-b4cd-63d921ca2f75',
      '0d708b05-6381-479e-b80c-a48fe1e0a447'
    ]
  },
  {
    _id: '93a3402a-87a9-4b4e-a735-717cc43572f7',
    first_name: 'Lionello',
    last_name: "O'Hearn",
    date_of_birth: '3/19/1931',
    hometownCity: 'Buffalo',
    hometownState: 'NY',
    books: []
  },
  {
    _id: 'd84dcc5c-99cf-4564-86d8-25f06b4c5e7c',
    first_name: 'Cole',
    last_name: 'Rossetti',
    date_of_birth: '9/1/1947',
    hometownCity: 'Albuquerque',
    hometownState: 'NM',
    books: []
  },
  {
    _id: '5a5c7c5f-8258-433c-aed7-2a498d355659',
    first_name: 'Lisette',
    last_name: 'Marshalleck',
    date_of_birth: '7/21/1929',
    hometownCity: 'Jacksonville',
    hometownState: 'FL',
    books: [
      '77ee69cf-1351-4ae7-b9e8-798ae8b47c81',
      '239eac45-ff2d-44a8-ba98-a57416dff561',
      '4de24920-044f-4c46-b95a-bd56101174dc',
      '9c3b6f35-7fa2-459c-bb44-6cd0749b4a3d',
      '010198a8-233c-42c5-8315-841d7569a349',
      '9374c77b-7ead-4b80-b0ff-c6dbccebf2a4'
    ]
  },
  {
    _id: '616c089e-f551-4abe-82e0-0b0e1162c10b',
    first_name: 'Cyndia',
    last_name: 'Dinsdale',
    date_of_birth: '10/18/1989',
    hometownCity: 'Huntsville',
    hometownState: 'AL',
    books: [
      '4bf0fb43-b39a-40cc-a656-e007e10d12bc',
      '5bdbc643-bfe4-4e1c-998b-58e2aac3c134',
      'ef710312-3333-41f5-acc4-ea023139acd5'
    ]
  },
  {
    _id: '8f05cd37-2622-4c6a-a5a7-d9d3b48cb3fe',
    first_name: 'Sloane',
    last_name: 'Hamor',
    date_of_birth: '7/17/1949',
    hometownCity: 'Pasadena',
    hometownState: 'CA',
    books: [
      'b28043c7-1f52-4754-9710-027dbeab0381',
      '5c412111-f9d4-4fd3-a3d9-a0fc13124c56',
      '0696810e-13b2-4f07-8c22-e4bc62f753e7',
      '46859e66-324a-41ad-ac7a-52e824399c3a',
      'a730d965-20c8-4360-b256-1598fbf8419c',
      '15e995ee-f98a-49f2-88a6-f5333e128ea4'
    ]
  },
  {
    _id: 'a650c7a8-1f04-465e-afa7-9e2041276276',
    first_name: 'Sigismond',
    last_name: 'Bahia',
    date_of_birth: '6/21/1902',
    hometownCity: 'Memphis',
    hometownState: 'TN',
    books: []
  },
  {
    _id: '4fe93412-443f-4dd8-97d4-4e46170bda3b',
    first_name: 'Vladimir',
    last_name: 'Polland',
    date_of_birth: '2/11/1968',
    hometownCity: 'Saint Paul',
    hometownState: 'MN',
    books: ['7cacaf68-c040-42e1-aa7b-169b27517c00']
  },
  {
    _id: '73a93e9c-6aa7-4b8e-8421-c1275e7f8dd5',
    first_name: 'Wilhelmina',
    last_name: 'Norree',
    date_of_birth: '12/26/1968',
    hometownCity: 'Chicago',
    hometownState: 'IL',
    books: ['c6682b4f-68a6-453b-9be6-cca29f5204d2']
  },
  {
    _id: 'a9587c40-80dd-457b-8467-d676eb26a21b',
    first_name: 'Grata',
    last_name: 'Shires',
    date_of_birth: '5/13/1974',
    hometownCity: 'San Diego',
    hometownState: 'CA',
    books: []
  },
  {
    _id: 'fa628853-a277-45ef-a75e-b22fd18b554d',
    first_name: 'Andriette',
    last_name: 'Tremolieres',
    date_of_birth: '3/21/2000',
    hometownCity: 'Winter Haven',
    hometownState: 'FL',
    books: ['6fb2816a-926c-4b0c-b8ee-21fbb60aadfd']
  },
  {
    _id: '81c74c34-9bc4-4f0e-bd73-6138cf29b38d',
    first_name: 'Kristin',
    last_name: 'Kitchingman',
    date_of_birth: '3/10/1979',
    hometownCity: 'Indianapolis',
    hometownState: 'IN',
    books: [
      '26800f40-f664-4492-8694-fbf3516e2584',
      '5f4604b4-fadf-40f7-b268-8c0cd9562f21',
      'f757d5eb-f36a-4b73-8de8-a0431ae03815'
    ]
  },
  {
    _id: '9f78081d-47dd-4740-b06e-36c00d6dabec',
    first_name: 'Karleen',
    last_name: 'Reims',
    date_of_birth: '5/9/1980',
    hometownCity: 'Memphis',
    hometownState: 'TN',
    books: [
      '57f3719b-edfe-49e4-b522-dd088d527b50',
      '091c8a9d-cde6-4a0a-b697-cb14c0cb0000'
    ]
  },
  {
    _id: '5972400d-aad0-4de3-8230-77dbcfc6020f',
    first_name: 'Aldin',
    last_name: 'Bradman',
    date_of_birth: '8/15/1980',
    hometownCity: 'Baton Rouge',
    hometownState: 'LA',
    books: [
      'd603e29b-8201-4d2c-be5a-c8fea4cf2416',
      '94a15d18-ec2a-4713-aae6-2a6c2233521f'
    ]
  },
  {
    _id: 'dbdd46ff-8370-4f50-bf25-64905df6ce18',
    first_name: 'Katharine',
    last_name: 'Theurer',
    date_of_birth: '9/12/1941',
    hometownCity: 'Columbus',
    hometownState: 'GA',
    books: ['6afaac83-915a-442c-9850-876a5c1e870c']
  },
  {
    _id: 'c7297411-b3a3-4704-bcd8-48f097c65d5f',
    first_name: 'Haley',
    last_name: 'Darker',
    date_of_birth: '5/12/1971',
    hometownCity: 'Atlanta',
    hometownState: 'GA',
    books: [
      'd9688808-d047-4100-b284-88647f7aa3fd',
      '41883261-e453-4723-829a-e3b4f4b99b67'
    ]
  },
  {
    _id: 'a08c97cf-b040-4cd6-8eed-c9e1af4cfb35',
    first_name: 'Darryl',
    last_name: 'Stickford',
    date_of_birth: '1/16/1994',
    hometownCity: 'Lexington',
    hometownState: 'KY',
    books: [
      '4e99ec42-2e38-4efe-8507-a6323d50107f',
      '31a73d8f-11b8-43f8-8b67-7eaa38669cb8'
    ]
  },
  {
    _id: '6843b939-32c6-441a-830f-3caa8eae6fea',
    first_name: 'Baxy',
    last_name: 'Kender',
    date_of_birth: '11/20/1937',
    hometownCity: 'Saint Cloud',
    hometownState: 'MN',
    books: []
  },
  {
    _id: '38efca15-98d3-46b5-9b8d-fa27546c21b6',
    first_name: 'Bonnie',
    last_name: 'Whittock',
    date_of_birth: '9/6/1970',
    hometownCity: 'Newark',
    hometownState: 'NJ',
    books: [
      'f9d9fe9b-e931-4eb8-8709-8489150daed9',
      '6a3d372b-3035-4c6b-80c0-a9aa12aa6bdf',
      'd74c0a0a-a436-4822-b4a8-521ed8c6c451'
    ]
  },
  {
    _id: '8413647c-8144-4ccf-bf74-6d217a383d8b',
    first_name: 'Gilemette',
    last_name: 'Enser',
    date_of_birth: '1/19/1980',
    hometownCity: 'Macon',
    hometownState: 'GA',
    books: [
      'd2cf1bd1-931f-4cb4-a9cf-522540cd3d97',
      '26777279-92e1-475d-a75a-a1b2365ff83a'
    ]
  },
  {
    _id: '53ba42c6-2352-48fa-ba26-50d5b94d020c',
    first_name: 'Cary',
    last_name: 'Hardesty',
    date_of_birth: '6/18/1934',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: [
      '9169d64a-6ca0-47b9-b532-e1d7ca8383f1',
      '9d65394f-3882-41a7-a3a2-bf98bbb16a7d'
    ]
  },
  {
    _id: '07543699-6df0-49dc-8d99-d640c9398b92',
    first_name: 'Carma',
    last_name: 'Boxer',
    date_of_birth: '2/3/1958',
    hometownCity: 'Memphis',
    hometownState: 'TN',
    books: []
  },
  {
    _id: '1bc8b431-bbe5-4484-b175-e235d1dedfef',
    first_name: 'Katusha',
    last_name: 'Cainey',
    date_of_birth: '3/28/1943',
    hometownCity: 'Bloomington',
    hometownState: 'IL',
    books: []
  },
  {
    _id: 'af50a070-5770-4f47-ac6c-e0fa0efd90ab',
    first_name: 'Reggi',
    last_name: 'Vaughton',
    date_of_birth: '10/19/1959',
    hometownCity: 'Orlando',
    hometownState: 'FL',
    books: ['f1b61e11-0018-47b3-91bf-e9fdd156abf7']
  },
  {
    _id: '88bd4d52-9bfd-4419-b8f7-aa33ca8678ed',
    first_name: 'Llywellyn',
    last_name: 'Dowber',
    date_of_birth: '9/7/1938',
    hometownCity: 'Conroe',
    hometownState: 'TX',
    books: ['5e7458c0-8a6d-485a-babf-e40d3c9b938b']
  },
  {
    _id: '6ff250c1-ddaa-4abc-aeb2-8884a9f49a71',
    first_name: 'Kellie',
    last_name: 'Breznovic',
    date_of_birth: '4/7/1910',
    hometownCity: 'Springfield',
    hometownState: 'MO',
    books: [
      'cf4c4706-304a-4a90-a0b5-29f8721b439b',
      '48d80727-d77e-463c-be8d-5f61747e4b79'
    ]
  },
  {
    _id: '4cd2372f-081d-438d-9a4a-db8b68168678',
    first_name: 'Giraud',
    last_name: 'Cloke',
    date_of_birth: '11/26/1951',
    hometownCity: 'Huntington Beach',
    hometownState: 'CA',
    books: ['508ef941-0fb4-4195-a9ff-e94111d260b2']
  },
  {
    _id: '0d2f602a-882e-4850-b564-8101e1e871af',
    first_name: 'Loralie',
    last_name: 'Timbs',
    date_of_birth: '8/15/1911',
    hometownCity: 'Tallahassee',
    hometownState: 'FL',
    books: [
      '00d967a4-d081-420e-8a48-692049e27566',
      '454fdd8e-0e71-4c33-916b-a62644bff991'
    ]
  },
  {
    _id: '2a35a7ce-6c7a-483c-9f82-4e437dfe82be',
    first_name: 'Corbet',
    last_name: 'Choak',
    date_of_birth: '2/7/1970',
    hometownCity: 'Mobile',
    hometownState: 'AL',
    books: ['62fb9a0e-3b7d-4a55-ae3b-9e8439495e18']
  },
  {
    _id: '905af35b-2748-4028-8b91-09185eec7e29',
    first_name: 'Cass',
    last_name: 'Pavett',
    date_of_birth: '11/2/1925',
    hometownCity: 'Baton Rouge',
    hometownState: 'LA',
    books: [
      '48a48780-b0f9-4ec1-9623-0fa35a133a10',
      '0d56e5be-4c2b-468f-b379-7603ce88dce2'
    ]
  },
  {
    _id: '9c605d7e-5ca6-4796-9626-f406685f54b1',
    first_name: 'Vera',
    last_name: 'Craigheid',
    date_of_birth: '8/27/1908',
    hometownCity: 'Alexandria',
    hometownState: 'VA',
    books: [
      'afb6ebf5-fc43-4389-aec9-fed650aa2218',
      'da9ac323-6abb-4b92-ab05-ccfcbcbd2636'
    ]
  },
  {
    _id: '0c22558c-0ae9-43f4-ad7f-1ed7c3c39ee2',
    first_name: 'Tybie',
    last_name: 'Schoolcroft',
    date_of_birth: '9/15/1955',
    hometownCity: 'Visalia',
    hometownState: 'CA',
    books: [
      '821cb03a-955b-4e9a-8d4b-bef7c0c987f2',
      'd0c82f48-3a95-4025-8341-bc573bbd635b'
    ]
  },
  {
    _id: 'f3159d8b-d89b-4741-a77f-ea80b0998491',
    first_name: 'Rois',
    last_name: 'Fairman',
    date_of_birth: '5/25/2002',
    hometownCity: 'Austin',
    hometownState: 'TX',
    books: [
      '88526385-551a-4dcf-91c1-7097ee4fb894',
      'fe9ec5fe-8c67-4507-a250-91edb6edcb93',
      '717200ef-e58f-42a7-82cd-4a27403e52fd',
      '7185ed19-229e-45fa-9c53-aca809430618',
      '2462d3aa-f532-4a44-b8e6-abb628b080c5'
    ]
  },
  {
    _id: 'd104aabb-d820-4110-9cfb-1f9a7ad51d76',
    first_name: 'Chantalle',
    last_name: 'Prati',
    date_of_birth: '12/6/2001',
    hometownCity: 'Memphis',
    hometownState: 'TN',
    books: [
      '5f8e8568-d2c4-4909-ab19-df089dedd029',
      '95391dd2-868e-4603-9044-0021548543e7'
    ]
  },
  {
    _id: '23e80b21-2fd0-4a4e-9397-f578a8c0a057',
    first_name: 'Nola',
    last_name: 'Newcome',
    date_of_birth: '7/2/1981',
    hometownCity: 'Flint',
    hometownState: 'MI',
    books: [
      '1095f0cf-77cf-49b9-903a-68bbc421969a',
      'e7eed453-6ec3-4921-a222-55f4d31ea3b8'
    ]
  },
  {
    _id: '2fc320d8-c1ba-477f-b6e9-5c3c23efbf0a',
    first_name: 'Joline',
    last_name: 'Ingram',
    date_of_birth: '5/20/1909',
    hometownCity: 'Atlanta',
    hometownState: 'GA',
    books: ['82461005-273a-4a9e-b00e-8d7e9bae023a']
  },
  {
    _id: '0718844e-fdfb-48a1-a3dd-b1d7cda19c29',
    first_name: 'Zed',
    last_name: 'Banbrook',
    date_of_birth: '4/10/1967',
    hometownCity: 'Terre Haute',
    hometownState: 'IN',
    books: ['62310c2f-00d6-41b2-a61f-35f1869a8499']
  },
  {
    _id: '757e021b-a7e0-40e4-9e4f-3b944433f545',
    first_name: 'Waite',
    last_name: 'Roxburgh',
    date_of_birth: '4/8/1971',
    hometownCity: 'Bakersfield',
    hometownState: 'CA',
    books: [
      '2dd023b7-bb50-4f50-96c5-b67bd863f7ef',
      'ed2ca376-cbe3-47f7-af34-7a033de51a02',
      '6daf356c-d087-419a-ade5-cda83412b4c7',
      'ccb62acd-691e-44b6-a1d3-d6a7d293a4d6',
      '37c5c1e9-bf48-4475-a6b5-b3f337849243',
      '25117e27-bce6-42ad-9ecd-f05be93342b0'
    ]
  },
  {
    _id: '8615dc19-f563-41ea-a37d-f4ddf988f463',
    first_name: 'Meghann',
    last_name: 'Forseith',
    date_of_birth: '2/20/1908',
    hometownCity: 'Tampa',
    hometownState: 'FL',
    books: [
      'a83d96f7-e9de-4359-a120-c8f14098f474',
      '6fdf7730-e5ec-406f-8f3f-98a0a7265844'
    ]
  },
  {
    _id: 'e04c2206-7738-416e-ab72-aa7d846adbac',
    first_name: 'Jayne',
    last_name: 'McKimm',
    date_of_birth: '8/6/1967',
    hometownCity: 'Jacksonville',
    hometownState: 'FL',
    books: [
      'a186c79c-a9b4-4467-9faa-dd77dfc95b69',
      'c21e58ad-e047-4aa1-8c33-f0ba1505d8fc'
    ]
  },
  {
    _id: '38cb7ec6-0150-4382-bb7b-79fc3d8ef293',
    first_name: 'Keary',
    last_name: 'Ugo',
    date_of_birth: '2/13/1919',
    hometownCity: 'Newark',
    hometownState: 'NJ',
    books: [
      '112fa08b-9c95-4178-bc27-a0bf00a96d20',
      '229a1635-b9bf-417b-b078-4bbb9d20d75f',
      '5c857aa2-3dbb-459a-a738-2ba75f38b0b2'
    ]
  },
  {
    _id: 'f7ca40f3-7532-4e30-8294-033621c53d6e',
    first_name: 'Amelie',
    last_name: 'Cull',
    date_of_birth: '9/12/2001',
    hometownCity: 'Knoxville',
    hometownState: 'TN',
    books: [
      'bb60a34d-bdc9-446f-9b9e-ba057208e04f',
      'e0b1623f-bf41-4458-aeb9-d204c55462c7',
      '7057b40d-ff62-4cc7-b559-a17850af2fcb',
      '51c1094a-34ee-4f1f-b282-9005c0df2888',
      '93b4e3c2-80a6-43f0-b833-2fccc0a064da'
    ]
  },
  {
    _id: '935e284a-3232-49e2-a619-a4ebcff82601',
    first_name: 'Ivette',
    last_name: 'Weatherhill',
    date_of_birth: '2/22/1975',
    hometownCity: 'Champaign',
    hometownState: 'IL',
    books: [
      '31c011e6-3041-45da-95bc-0505d298c3d2',
      'ad909b9a-4557-421d-98af-53c01d1bc660',
      'ed87310e-5cca-4b7f-a0f2-1c660a822bf1',
      '177476b9-def2-4ded-b5cd-3df64e7d99f9'
    ]
  },
  {
    _id: 'e920d89e-b303-4d4e-b4a5-6d7a4dd920f2',
    first_name: 'Bennett',
    last_name: 'Crolly',
    date_of_birth: '6/18/1980',
    hometownCity: 'Boulder',
    hometownState: 'CO',
    books: ['e4c55890-4b09-491d-971e-a379aa331b38']
  },
  {
    _id: '2ddfc0e1-93ef-4ec2-ae77-7d5525305473',
    first_name: 'Malia',
    last_name: 'Look',
    date_of_birth: '10/24/1988',
    hometownCity: 'Greensboro',
    hometownState: 'NC',
    books: [
      '40913fde-1113-47d7-a4d1-56ccf09ef08e',
      '912f7432-8d1b-4f68-82fb-271b8a5b3247'
    ]
  },
  {
    _id: '9b9e7564-d1d5-4c40-a040-5ae6e72a54b0',
    first_name: 'Carlota',
    last_name: 'Caswill',
    date_of_birth: '2/1/1929',
    hometownCity: 'Knoxville',
    hometownState: 'TN',
    books: [
      'bd12add8-27ce-4ff5-a3db-6d2a16b7ef31',
      '91c1a0d5-4a5f-4308-947c-57e771c7e3af'
    ]
  },
  {
    _id: 'b6193392-ae4c-422c-9670-b3a05a7280e2',
    first_name: 'Pamelina',
    last_name: 'Sharpling',
    date_of_birth: '4/22/1970',
    hometownCity: 'Atlanta',
    hometownState: 'GA',
    books: ['03a7fc09-5b38-49af-b3c1-7c521ada8e36']
  },
  {
    _id: '4825d81f-42c5-4bee-810b-4ae6f917067e',
    first_name: 'Garwood',
    last_name: 'Mocquer',
    date_of_birth: '3/23/1906',
    hometownCity: 'Inglewood',
    hometownState: 'CA',
    books: [
      '51d2a5d1-ea91-4449-a292-053ef6c76240',
      '75253ba6-daab-4a83-a634-39dea1eb404e',
      'afa1edeb-4954-461b-9a80-6d5cd5babed8'
    ]
  },
  {
    _id: '347ae575-3cf2-4081-8b31-4a3674288d38',
    first_name: 'Daphne',
    last_name: 'Orrocks',
    date_of_birth: '6/20/1958',
    hometownCity: 'Richmond',
    hometownState: 'VA',
    books: [
      '7dbfe3bc-1a39-4689-8fb5-bea44b637a3a',
      '8cab6854-9c95-453f-bfcf-2a8a89760821',
      'b010bcbd-36f2-4da8-836e-fb9af5d91025'
    ]
  },
  {
    _id: 'e1513adf-4de2-445e-88d6-84e7ec8d90bd',
    first_name: 'Janene',
    last_name: 'Featherstonhalgh',
    date_of_birth: '8/5/1948',
    hometownCity: 'Albany',
    hometownState: 'NY',
    books: ['e9bb75f8-e2e4-45ef-a2bf-afa60bff371b']
  },
  {
    _id: '6eae44cc-641e-4670-9806-5a11d33be649',
    first_name: 'Abey',
    last_name: 'Brickner',
    date_of_birth: '6/12/1991',
    hometownCity: 'Aurora',
    hometownState: 'IL',
    books: [
      '20ca4703-2f51-4f5e-856b-f7a7ce2b97cc',
      'a160d2f1-5b8f-4563-8eed-b6c7b3781682'
    ]
  },
  {
    _id: '3609b2b8-eb96-4d43-a772-42d8110c2b5f',
    first_name: 'Babita',
    last_name: 'Clackers',
    date_of_birth: '7/8/1947',
    hometownCity: 'Columbia',
    hometownState: 'SC',
    books: ['e0dc6d95-fcdd-4044-8454-c3910a67b89b']
  },
  {
    _id: '21cb65d1-3f24-4efd-be42-5169707738b4',
    first_name: 'Talia',
    last_name: 'Thornham',
    date_of_birth: '7/9/1928',
    hometownCity: 'Pompano Beach',
    hometownState: 'FL',
    books: [
      '35d5ca4a-6a9e-4e6d-97d9-11192160d91c',
      '4d746158-05bf-4ae2-be97-ec7a1b939a54',
      '78b77d7f-6e9f-4ccc-a511-53794c859caa'
    ]
  },
  {
    _id: 'd456d4d6-1ea4-4726-a758-538082d6a01d',
    first_name: 'Desmond',
    last_name: 'Eddington',
    date_of_birth: '7/20/1988',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: [
      'fd84a773-7d88-4c0d-b95c-0a6626d4682f',
      '3457f523-c031-4b13-87bf-785a0e5013f9'
    ]
  },
  {
    _id: 'eea94c31-9e82-4c6a-949f-77aedca936e0',
    first_name: 'Graehme',
    last_name: 'Kleinholz',
    date_of_birth: '11/1/1913',
    hometownCity: 'Saint Paul',
    hometownState: 'MN',
    books: [
      '91b1e81b-5191-433b-959e-5aa10f1ee626',
      'eabba912-e81e-4326-989f-6f627db203cd'
    ]
  },
  {
    _id: '58af24c2-21ea-4b9e-903b-54facd8d9b17',
    first_name: 'Malachi',
    last_name: 'Firks',
    date_of_birth: '5/29/1919',
    hometownCity: 'Charlotte',
    hometownState: 'NC',
    books: [
      '8326d753-a638-496c-943c-9ca0d6031bc6',
      'ade4f1cf-aa58-4641-b97d-df161b781b19'
    ]
  },
  {
    _id: '545f84c0-63d1-419c-a21a-a46d8a189c79',
    first_name: 'Tommi',
    last_name: 'Banasevich',
    date_of_birth: '1/17/1998',
    hometownCity: 'Wilmington',
    hometownState: 'NC',
    books: [
      'a1dd130f-a565-4aee-a70e-c70e6a2c4163',
      '191a1a0c-dca6-4c07-be53-f61a9c4b907d',
      '8def5c59-c208-4ba4-af11-4627f6ed0db3'
    ]
  },
  {
    _id: 'ecdd3fb8-90dc-4b71-9ed4-f279ec36f381',
    first_name: 'Kessia',
    last_name: 'Liverock',
    date_of_birth: '4/28/1944',
    hometownCity: 'New York City',
    hometownState: 'NY',
    books: ['f33a65a8-d11a-4ccf-bd40-583239b6f9ed']
  },
  {
    _id: '15a9dc9d-5c8b-42af-84b2-09aff89b8e56',
    first_name: 'Bert',
    last_name: 'De Vuyst',
    date_of_birth: '2/24/1966',
    hometownCity: 'Decatur',
    hometownState: 'GA',
    books: [
      '9e2002a1-92da-43ba-bd46-33e4d93966ad',
      '4313e8b5-c053-487d-9fd1-3ede9e3397cc'
    ]
  },
  {
    _id: 'ce9d7482-72d1-4067-9212-62516c7d139b',
    first_name: 'Anjanette',
    last_name: 'Bullas',
    date_of_birth: '9/2/1989',
    hometownCity: 'Buffalo',
    hometownState: 'NY',
    books: [
      'c037ff2b-0e48-44ca-9504-d10605ed633d',
      'f6e8ff0b-8533-483f-8dc0-be8c4d4b86f1',
      '2ab25ff6-7373-4709-a4a0-34dc97470b1e'
    ]
  },
  {
    _id: '4d9851c6-3ce4-4d0f-9331-a61c4198ab8d',
    first_name: 'Mayor',
    last_name: 'Smithin',
    date_of_birth: '12/12/1916',
    hometownCity: 'Ocala',
    hometownState: 'FL',
    books: [
      '6947d9be-4c29-4d5e-9833-96ed0e9f2ed2',
      '58efb4a9-eeeb-4c16-acce-e421f5bb4955',
      'ae7a5ff1-084d-4a0c-9cba-2dd20cea6f41'
    ]
  },
  {
    _id: '2dac4009-8b45-4707-8701-2a5263d329bd',
    first_name: 'Carolee',
    last_name: 'Kennelly',
    date_of_birth: '5/24/1914',
    hometownCity: 'Miami',
    hometownState: 'FL',
    books: [
      'd6bf9799-e794-4632-8da9-5252d1664a5b',
      '8263b518-2e17-4ba2-8291-d265644056e4',
      'dad4d51b-930f-438c-a452-b99a22b9a611'
    ]
  },
  {
    _id: '8ac91c1f-2953-4700-a5b3-65ca01c03bf8',
    first_name: 'Georgeta',
    last_name: 'Tolliday',
    date_of_birth: '4/24/1960',
    hometownCity: 'Fort Lauderdale',
    hometownState: 'FL',
    books: [
      '5e0e74ca-77f7-4b9f-9cda-719b6dfcfe78',
      'c36e56bd-b2fe-4b8e-b5da-45c1e7ce62f2'
    ]
  },
  {
    _id: '6ab99a6b-d96f-4b3b-9402-760e054e3c7d',
    first_name: 'Torr',
    last_name: 'Pavlishchev',
    date_of_birth: '11/19/1938',
    hometownCity: 'New Orleans',
    hometownState: 'LA',
    books: [
      '046f00b9-7dfc-4b42-a139-0c3c4ab8c2fe',
      '01eb866c-1690-4bc5-abd2-34acf3309c9f',
      '3876fd63-7c9c-46a0-8f72-933f65110942',
      '09c449f0-b0ec-4f74-bdd6-580afb552bc0',
      'a1a68732-c869-412f-aa5c-6af7a86ab864'
    ]
  },
  {
    _id: '4208ab06-9757-4906-bad9-55a94a01072e',
    first_name: 'Shannah',
    last_name: 'Decayette',
    date_of_birth: '9/25/1946',
    hometownCity: 'Bethesda',
    hometownState: 'MD',
    books: ['7eb2f97c-861b-46ac-9a88-c0c42aee0dd1']
  },
  {
    _id: '96d8604e-0e99-4bd1-bcc6-1a0800b317c2',
    first_name: 'Katti',
    last_name: 'McClaren',
    date_of_birth: '2/28/1959',
    hometownCity: 'Seattle',
    hometownState: 'WA',
    books: [
      'd535eb5e-9825-4f24-a90a-d5f6d5f56d38',
      '651dc87a-e239-4b24-8c56-87f15dd01c4f',
      'af8bedf5-34a8-4099-9b37-efcc48644a51',
      'fb967d7e-58c7-4157-8d50-23e9f9a54bc3',
      '7c31d067-25c9-476c-8fba-1c337515f01d',
      'b5b2e9d0-c26d-4f5f-aa67-e76dd8fe884b',
      '8f5c355e-377d-466a-96f7-da0be9ccab30'
    ]
  },
  {
    _id: 'c8a409c4-972a-401f-af31-aff4e99921be',
    first_name: 'Esther',
    last_name: 'Southworth',
    date_of_birth: '10/28/1959',
    hometownCity: 'Jacksonville',
    hometownState: 'FL',
    books: []
  },
  {
    _id: '095705f2-38e9-431f-9f75-7a32f09b9107',
    first_name: 'Shane',
    last_name: 'Abramow',
    date_of_birth: '4/16/1963',
    hometownCity: 'Reston',
    hometownState: 'VA',
    books: [
      '9b8b6383-8cbf-4347-a622-58562789bc2a',
      'cc3fb5fe-28b9-4309-8271-298d32bf33e9'
    ]
  },
  {
    _id: '6c17ed87-adc0-4b74-a785-4cf52b7a5a6d',
    first_name: 'Lauree',
    last_name: 'Henriquet',
    date_of_birth: '10/12/1911',
    hometownCity: 'Tucson',
    hometownState: 'AZ',
    books: [
      '549f8321-dd2d-488d-91d4-e21b30236cb0',
      'b9bce03a-071d-411e-92c0-4d70cc46cc85',
      '5a482edc-1f56-4ad1-8ded-390712545f04',
      '0cff6b07-1f6f-4359-a472-93a3841a8ed9'
    ]
  },
  {
    _id: 'e8fcb35b-2d2d-4af8-8766-11bc06e63a69',
    first_name: 'Minor',
    last_name: 'Spoward',
    date_of_birth: '4/29/1985',
    hometownCity: 'Erie',
    hometownState: 'PA',
    books: [
      '3614e939-52e9-4eed-b3fc-58f407dd81b7',
      'a1043fe1-e9a4-4802-bee0-f454ec33134a'
    ]
  },
  {
    _id: '5a211082-2ff6-433a-a973-f71fdbed049e',
    first_name: 'Allis',
    last_name: 'Pawden',
    date_of_birth: '5/4/1942',
    hometownCity: 'Louisville',
    hometownState: 'KY',
    books: [
      '4641643d-0221-48a6-bb7b-d8b9561f4b8f',
      '8914e24c-fa89-42ee-b223-4890b61680c9'
    ]
  },
  {
    _id: 'ff133d67-f674-493c-a301-55914ac411e2',
    first_name: 'Rafaelia',
    last_name: 'Demare',
    date_of_birth: '12/12/1948',
    hometownCity: 'Tacoma',
    hometownState: 'WA',
    books: [
      '3eaebc6f-7dbf-4f48-8d1d-2d2699e7197c',
      'fbbd0e20-df5f-4453-9314-d5bfe2d6b387',
      '72566041-56d9-47e2-802d-0dc35460b604',
      'cc0a61e2-770e-44a9-8fe7-bd81fb609aa4'
    ]
  },
  {
    _id: 'd591b088-c7e4-472d-a075-884586a51bf8',
    first_name: 'Mirabel',
    last_name: 'Rain',
    date_of_birth: '6/25/1968',
    hometownCity: 'Pueblo',
    hometownState: 'CO',
    books: [
      'a30932cb-1e85-4aae-9c41-bf387ad6cffe',
      '44b611da-ded8-464b-9357-15029e393a8e'
    ]
  },
  {
    _id: '0f48831d-a1bd-49b2-aecd-22d780a4dc67',
    first_name: 'Elston',
    last_name: 'Prentice',
    date_of_birth: '2/25/1931',
    hometownCity: 'Memphis',
    hometownState: 'TN',
    books: ['477525f2-755f-4537-ac43-70d0fcdcedc8']
  },
  {
    _id: 'b4981fcd-810e-495f-8e15-0af5694c21fa',
    first_name: 'Ara',
    last_name: 'Garza',
    date_of_birth: '3/8/1945',
    hometownCity: 'Killeen',
    hometownState: 'TX',
    books: []
  },
  {
    _id: 'e28d16d0-eba7-45cb-96a0-15520fafd03c',
    first_name: 'Terrijo',
    last_name: 'Tinn',
    date_of_birth: '9/27/1985',
    hometownCity: 'Richmond',
    hometownState: 'VA',
    books: [
      '9e3924e1-6e0a-4938-8bc0-bb9426778d81',
      'd871361a-b708-49c2-8bd0-50e354c642d6',
      '066a560b-bef4-49bf-b079-172a87b81ae0'
    ]
  },
  {
    _id: '5a7b0b23-8856-4a4c-9daa-2642ac0a44f0',
    first_name: 'Marika',
    last_name: 'Keenlayside',
    date_of_birth: '7/29/1939',
    hometownCity: 'Huntington',
    hometownState: 'WV',
    books: ['19632665-80df-434b-9bc9-6266fd363b1b']
  },
  {
    _id: '66957544-2bb6-43fc-883f-0ce6daea6dc5',
    first_name: 'Corrianne',
    last_name: 'Nicholson',
    date_of_birth: '4/23/1971',
    hometownCity: 'Minneapolis',
    hometownState: 'MN',
    books: []
  },
  {
    _id: '8603e557-730e-4ce0-8760-6fbcbbc45806',
    first_name: 'Melisandra',
    last_name: 'Boothebie',
    date_of_birth: '3/18/2001',
    hometownCity: 'Sacramento',
    hometownState: 'CA',
    books: [
      '03f3f7d8-ccf1-4a2a-97eb-ae6e8aa876a1',
      '79e2d5c2-12ea-4c76-b1d5-e57721e6064d',
      'fd9c247c-f7c2-4e53-a5f4-07329b15969d'
    ]
  },
  {
    _id: '954b477c-4d10-42b1-96c9-59dbedbf4c54',
    first_name: 'Loralie',
    last_name: 'McFaul',
    date_of_birth: '8/15/1955',
    hometownCity: 'Trenton',
    hometownState: 'NJ',
    books: [
      'defc8f99-50a9-46a7-b9a6-b4f03bc79c92',
      '6e5ec7a5-5914-4cbf-bb94-0ed723e7de2d',
      '979f619a-6abb-40f1-a34f-7e7ec5eef94c',
      '5b2aa72d-6476-4bef-b193-18b5ec94d12e'
    ]
  },
  {
    _id: '08ea4126-55c9-4669-af5a-3ec5df08d0ca',
    first_name: 'Nerte',
    last_name: 'Roseblade',
    date_of_birth: '3/13/1937',
    hometownCity: 'Milwaukee',
    hometownState: 'WI',
    books: [
      'f3a40dae-49ba-4e78-8646-4af0cbbe9cdd',
      '18bf65c5-da0f-4f73-91a4-c5787c984d7b'
    ]
  },
  {
    _id: '04e3a9e3-49dd-476b-a7f4-5f2c6f77b040',
    first_name: 'Jedidiah',
    last_name: 'Wehnerr',
    date_of_birth: '9/30/1937',
    hometownCity: 'Brooklyn',
    hometownState: 'NY',
    books: [
      '705d7e24-15e9-4495-8d8d-02257dbec002',
      '7da10a25-8af6-462c-b3e7-5d3cb1dd66fb',
      '655e6dcd-9b19-473c-a62c-ca3ead8c0664'
    ]
  },
  {
    _id: '80afae66-0556-4cb8-8191-e81c6d61dd7b',
    first_name: 'Florian',
    last_name: 'Bleesing',
    date_of_birth: '11/26/1936',
    hometownCity: 'Honolulu',
    hometownState: 'HI',
    books: []
  },
  {
    _id: 'b9565135-e7ff-46b6-a864-df9a80f289cf',
    first_name: 'Laure',
    last_name: 'Clutterham',
    date_of_birth: '6/7/1982',
    hometownCity: 'Pittsburgh',
    hometownState: 'PA',
    books: [
      'a82cc4d3-2f9f-4684-9ed4-02175d2b7871',
      '567d655e-63c0-4482-8934-ca41c5747c44'
    ]
  },
  {
    _id: '23896b07-323f-4865-99fb-cb2f5ee11881',
    first_name: 'Priscella',
    last_name: "O'Cannon",
    date_of_birth: '7/27/1994',
    hometownCity: 'Simi Valley',
    hometownState: 'CA',
    books: [
      'f1a8bffe-f257-424e-b339-3d364ffba559',
      'ee367928-0a10-43fd-8bcf-3c3bec24fd99',
      'e282f7ec-644f-4ddc-b2c4-5b4a90b9d5c9',
      'cc05066c-5e11-4667-a819-b33117770957',
      '5ea781d0-5bee-4623-8a8d-8d85aed1a64e'
    ]
  },
  {
    _id: 'ee390526-3bf8-452f-bcfb-69fb9c871d39',
    first_name: 'Chelsey',
    last_name: 'Mathivon',
    date_of_birth: '6/7/1937',
    hometownCity: 'Chicago',
    hometownState: 'IL',
    books: []
  },
  {
    _id: '95fddc41-c713-405d-997c-16afcc612de5',
    first_name: 'Tobit',
    last_name: 'Redholls',
    date_of_birth: '7/19/1920',
    hometownCity: 'San Diego',
    hometownState: 'CA',
    books: [
      '6d2a8429-50bb-419b-88ef-e143081e6ee4',
      '06f8577b-02ba-4c20-a0ac-e6a84295cec0'
    ]
  },
  {
    _id: 'cb503a3f-1b42-425c-bceb-93014711f259',
    first_name: 'Lottie',
    last_name: 'Skinley',
    date_of_birth: '8/28/1928',
    hometownCity: 'Appleton',
    hometownState: 'WI',
    books: [
      'ca72aaf7-d8b9-46d5-b6db-d0a47b73e2ea',
      '21badfcb-8bc2-4ac1-bdbc-7b51848948de',
      '623657cd-ba6e-4a0c-875c-b5d41ab65991',
      '7b60bea1-08b4-456e-ad05-e734b572d6a3',
      'd1dd8faf-9444-48ae-b2f0-5300b9bc1692'
    ]
  },
  {
    _id: 'e09b5a4c-0f84-427d-9353-863a2969a0d2',
    first_name: 'Opaline',
    last_name: 'Sherratt',
    date_of_birth: '1/13/1989',
    hometownCity: 'Saint Paul',
    hometownState: 'MN',
    books: ['90b8e7cf-2393-444d-b8fb-e1f8656a53df']
  },
  {
    _id: '6b4c20da-9321-413f-97ee-86c3e769eabd',
    first_name: 'Thomas',
    last_name: 'Guterson',
    date_of_birth: '8/8/1926',
    hometownCity: 'Saint Paul',
    hometownState: 'MN',
    books: [
      'eaa1a0dd-43cf-40a2-a178-b05d4e0eceed',
      '97aba072-578e-4e94-bbb5-e818bcdc6e3e'
    ]
  },
  {
    _id: 'f645d28a-670a-457a-b55f-a32876b8511d',
    first_name: 'Brooke',
    last_name: 'Adcock',
    date_of_birth: '10/10/1985',
    hometownCity: 'Phoenix',
    hometownState: 'AZ',
    books: [
      '99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e',
      '0767b967-15d6-4c00-9e7d-c69a236e62b0',
      '2d8fc8aa-550a-4c93-b0bd-d9c66aea2a2f',
      '9d0b4446-786d-44f8-b501-37f5788e3f8f'
    ]
  },
  {
    _id: '0cd81324-d1c0-4a3a-babb-3277f36c7019',
    first_name: 'Herc',
    last_name: 'Rulf',
    date_of_birth: '12/9/1951',
    hometownCity: 'Temple',
    hometownState: 'TX',
    books: ['e1fd955f-a913-4a99-bf47-113d0a0b494c']
  },
  {
    _id: '5dd4474d-13d0-4fc1-85f7-aa8830c26d57',
    first_name: 'Paxon',
    last_name: 'Davitt',
    date_of_birth: '7/28/1966',
    hometownCity: 'Bryan',
    hometownState: 'TX',
    books: ['4d72791a-2826-48d0-8a2e-13a0dae424cf']
  },
  {
    _id: '47ac3341-6d18-46ba-afc8-596f10030bd3',
    first_name: 'Alphonso',
    last_name: 'Doyland',
    date_of_birth: '9/28/1946',
    hometownCity: 'Newark',
    hometownState: 'NJ',
    books: [
      '112c8c75-9fa7-45aa-81be-4e391d517b36',
      '4c3ab4ea-a8ea-40dd-babf-5da852ac9e81'
    ]
  },
  {
    _id: '92cc5f96-3d5f-4ac8-a0d6-9630f5a02ec8',
    first_name: 'Andrei',
    last_name: 'Neave',
    date_of_birth: '10/22/1904',
    hometownCity: 'Akron',
    hometownState: 'OH',
    books: [
      '49cbbb3f-f9b6-47db-8805-7153a2da61a7',
      '444aa782-a87e-40f3-a6ff-e066c6b7b3f1'
    ]
  },
  {
    _id: '4c0dbdc2-8002-408c-b9a1-f65e34dda75b',
    first_name: 'Faunie',
    last_name: 'Pennuzzi',
    date_of_birth: '4/15/1962',
    hometownCity: 'Humble',
    hometownState: 'TX',
    books: []
  },
  {
    _id: 'bbf52289-621d-4b37-9e51-3612587aa12b',
    first_name: 'Darrel',
    last_name: 'Vail',
    date_of_birth: '11/12/1962',
    hometownCity: 'Jersey City',
    hometownState: 'NJ',
    books: ['4ed417ac-67d2-4462-933c-cb517008fb4e']
  },
  {
    _id: '375ea9be-3e7e-4d00-a01c-b0a3a0148be6',
    first_name: 'Franciska',
    last_name: 'Prendiville',
    date_of_birth: '4/13/1949',
    hometownCity: 'Manchester',
    hometownState: 'NH',
    books: [
      'f0702c9e-aaf7-49aa-ac08-de9227ba07c8',
      '2aae3621-a948-4897-97f6-3f60128fdb00',
      'eea5b861-6664-4fea-8a47-c32a2ceeab7b'
    ]
  },
  {
    _id: 'ef5783eb-eec4-4f35-af6d-4c3bfcc036ff',
    first_name: 'Aland',
    last_name: 'Brosoli',
    date_of_birth: '8/19/1909',
    hometownCity: 'Los Angeles',
    hometownState: 'CA',
    books: [
      '7835d7c8-b419-4c27-8d9b-7b4d2dee2ace',
      '4766ae27-b93c-4ef2-92da-5ab12cd539b8',
      'b59f3409-7872-4912-b33c-40564843ec18'
    ]
  },
  {
    _id: '365bcc6b-db32-4883-bcc3-f9a62df58ce9',
    first_name: 'Nester',
    last_name: 'Crauford',
    date_of_birth: '10/4/1908',
    hometownCity: 'Dallas',
    hometownState: 'TX',
    books: [
      'fc7b8f84-e15f-43ae-a4eb-8fbf5d976dfc',
      'df9debe3-1b1b-4d82-9197-1fcaf0f0e9de'
    ]
  },
  {
    _id: 'fd909907-9c4f-4223-ad04-0fb5a187f30c',
    first_name: 'Genny',
    last_name: 'Koene',
    date_of_birth: '12/5/1995',
    hometownCity: 'Lawrenceville',
    hometownState: 'GA',
    books: [
      '333014a8-c20b-41fe-82b0-45574990bdf4',
      '14a5ba9c-dd8c-4002-9a0a-68269f53100d',
      '81a08b3f-d034-4016-9953-b9ceb6443aa4'
    ]
  },
  {
    _id: 'd9ea6a95-9ea8-4d70-89cc-8abc389aaa80',
    first_name: 'Zelma',
    last_name: 'Slocum',
    date_of_birth: '5/23/1918',
    hometownCity: 'Cincinnati',
    hometownState: 'OH',
    books: [
      '81a33bcf-cf75-4686-8352-feac36a42380',
      'd452d1df-311f-4e30-9f60-9f07bb9014fa',
      'a7f4dc6c-af66-41e1-83f4-cec16e87fc75'
    ]
  },
  {
    _id: '802d98db-0a9c-4539-8ad4-a6bc19385fb9',
    first_name: 'Bourke',
    last_name: 'Dykins',
    date_of_birth: '12/31/1931',
    hometownCity: 'Detroit',
    hometownState: 'MI',
    books: [
      '254a77b0-f055-4dc1-b9fa-3b23d811c8be',
      'ae71177b-95ab-49d7-bb1c-a2d2a3f46c33',
      'cae8d37e-4d82-4558-8cd6-7e9a464d3c36',
      '4650c99a-83d8-4391-88a2-4792ec0a0d88',
      'f4f2f66b-e7f2-4a2e-b0fe-dd3287a7f718'
    ]
  },
  {
    _id: 'b5f4b1de-bf43-4106-840b-bd0dd7e5ff37',
    first_name: 'Arturo',
    last_name: 'Ahrend',
    date_of_birth: '1/23/1964',
    hometownCity: 'Denver',
    hometownState: 'CO',
    books: [
      'b7c3c21b-ed92-427f-80cc-3dbc02e854e5',
      '6134f0ca-001c-4a0a-b2a7-4fdc2bc363a9',
      '2657574a-ff92-46ff-8ac3-2cc2887d9676'
    ]
  },
  {
    _id: '859b661c-1761-42bc-87e3-93ed892a1dd8',
    first_name: 'Waneta',
    last_name: 'Beccero',
    date_of_birth: '6/17/1911',
    hometownCity: 'Prescott',
    hometownState: 'AZ',
    books: [
      '7bd9e62c-69e0-402f-a5c8-062ec2496115',
      'cb6667b9-217a-4ba5-848b-080f60cdb36d'
    ]
  },
  {
    _id: 'd19b762d-b7ed-436a-babc-ae19344a7483',
    first_name: 'Sutton',
    last_name: 'Girardey',
    date_of_birth: '3/6/1932',
    hometownCity: 'Norfolk',
    hometownState: 'VA',
    books: [
      'd7600a81-38bd-44b8-82c9-4abbdebcf603',
      '75acd5e1-c769-4b17-a8f9-248e3cb94f00'
    ]
  },
  {
    _id: '9945ad76-02cd-419b-82cd-58fee9ef65f0',
    first_name: 'Amber',
    last_name: 'Bransom',
    date_of_birth: '9/28/1907',
    hometownCity: 'Jacksonville',
    hometownState: 'FL',
    books: ['9224661b-6e9e-47d1-9cf0-fac80047491b']
  },
  {
    _id: '2f384f94-3958-4894-a2d3-5eaa1a8ee8f3',
    first_name: 'Dodie',
    last_name: 'Konzel',
    date_of_birth: '7/25/1991',
    hometownCity: 'Hampton',
    hometownState: 'VA',
    books: [
      '9323dd71-952d-47eb-851e-098049b81e13',
      '6d09cb6b-3f87-45a9-8d67-970b3b710b9d',
      'c2780c93-2255-4800-8b7c-b7f6ddb69279'
    ]
  },
  {
    _id: '8292872d-dad4-490c-ba30-7459f647d2ba',
    first_name: 'Nanci',
    last_name: 'Point',
    date_of_birth: '9/12/1954',
    hometownCity: 'Columbus',
    hometownState: 'OH',
    books: [
      '9102a956-496b-452e-b94a-63d8a6092453',
      'dc349836-f560-4c42-b2a3-bc90ca40a65f',
      'e61f6601-9ec3-4d85-b0eb-69951f145f68',
      '69059f04-cd58-45ff-8770-638716b6ddc8'
    ]
  },
  {
    _id: 'cc37f78d-b034-4e43-8add-42055c477612',
    first_name: 'Kris',
    last_name: 'Rickets',
    date_of_birth: '3/14/1906',
    hometownCity: 'Charleston',
    hometownState: 'WV',
    books: [
      '7c591444-03b3-4a34-8994-cc93490beb00',
      'd87f8b98-292a-4201-8208-7b8261eeb3ea',
      '4953e326-0f1a-4911-ab0d-e546f4cf6445'
    ]
  },
  {
    _id: 'cc50469f-6265-44ba-99be-2e27b4b60a4b',
    first_name: 'Thaddeus',
    last_name: 'McVitty',
    date_of_birth: '3/25/1906',
    hometownCity: 'Cincinnati',
    hometownState: 'OH',
    books: [
      'b5c4c035-0d3c-4269-9136-81e7c80d0413',
      'e2cce5d2-a19c-4c4a-ac13-c2f8f855691c'
    ]
  },
  {
    _id: 'ce8bda8f-d13c-4035-95d9-1e0644a76172',
    first_name: 'Hollie',
    last_name: 'Aykroyd',
    date_of_birth: '3/3/1998',
    hometownCity: 'Pittsburgh',
    hometownState: 'PA',
    books: ['81e4af9c-c3ec-4df2-b1b5-ebacf5e50153']
  },
  {
    _id: '32b4a18e-bcc8-49c7-a7ce-2cda6aff382c',
    first_name: 'Nani',
    last_name: 'Piercy',
    date_of_birth: '12/15/1958',
    hometownCity: 'Honolulu',
    hometownState: 'HI',
    books: [
      '87081474-1653-4693-9b92-e67b97c71e1a',
      '4684640c-ad9d-445c-8811-e2563217d2bf'
    ]
  },
  {
    _id: 'eb541d9a-16ea-47f9-ae36-1ba6bcfa7494',
    first_name: 'Dorri',
    last_name: 'Matyushkin',
    date_of_birth: '5/31/1950',
    hometownCity: 'Charlotte',
    hometownState: 'NC',
    books: [
      '3f01c00e-dd02-4873-8036-7ebccb530e97',
      'b5c585ef-31d2-41b8-b94a-aed0f92807d4'
    ]
  },
  {
    _id: '7ac98ce8-e4bf-4e0b-9081-ffb556c0b2a8',
    first_name: 'Darleen',
    last_name: 'Attwood',
    date_of_birth: '2/24/1932',
    hometownCity: 'Arvada',
    hometownState: 'CO',
    books: [
      '9ad3cd23-c40f-41b2-91af-261f28281c6a',
      '837a7f30-ad62-401b-9b09-e2f4a46f6266'
    ]
  },
  {
    _id: '4c2c0950-ba00-4da9-95df-373a648d02af',
    first_name: 'Devan',
    last_name: 'Findlow',
    date_of_birth: '5/21/1955',
    hometownCity: 'Jamaica',
    hometownState: 'NY',
    books: ['bd680d08-e8cc-4f69-b718-ce5c3b3f7953']
  },
  {
    _id: 'b2b96c9b-402b-4256-8542-d966f242e9c6',
    first_name: 'Bathsheba',
    last_name: 'Hitcham',
    date_of_birth: '2/1/1972',
    hometownCity: 'Little Rock',
    hometownState: 'AR',
    books: ['8ac66f3d-1f75-46e5-bd9d-c0e2a3078f50']
  },
  {
    _id: '57ccf8e3-8b09-4364-afed-9a9546962d33',
    first_name: 'Audra',
    last_name: 'Lehrle',
    date_of_birth: '7/26/1972',
    hometownCity: 'Greensboro',
    hometownState: 'NC',
    books: [
      'b0ea221c-0938-49db-800d-966fb0bedfc9',
      '1df07c01-8eba-47b6-bde3-bc0f8c725ed7'
    ]
  },
  {
    _id: 'b9e0dee8-7e4b-49f3-a522-8d41ee20adc7',
    first_name: 'Christa',
    last_name: 'Piddlehinton',
    date_of_birth: '3/24/1982',
    hometownCity: 'Los Angeles',
    hometownState: 'CA',
    books: [
      'b050e9b0-482d-4ae8-a436-10797ae36bfb',
      '4fd53343-14ee-4cc6-97eb-27e1c630930f'
    ]
  },
  {
    _id: '04732e53-8b91-471f-a402-b3e767da8790',
    first_name: 'Tiphanie',
    last_name: 'Butters',
    date_of_birth: '3/2/1944',
    hometownCity: 'Charleston',
    hometownState: 'SC',
    books: [
      '19125406-3693-41f1-bb3a-6c16167a7ed3',
      'c45a6f6d-b799-4c96-98e8-d197a19b950a'
    ]
  },
  {
    _id: '48130f47-f29f-4389-b9cd-969c927533e6',
    first_name: 'Laverne',
    last_name: 'Kuscha',
    date_of_birth: '3/18/1909',
    hometownCity: 'Long Beach',
    hometownState: 'CA',
    books: ['d914f0bf-3cf3-45d1-b67a-fd08ceea0be1']
  },
  {
    _id: '309142ce-c7b0-4215-8bee-443f8ef8bbfc',
    first_name: 'Panchito',
    last_name: 'Van der Hoven',
    date_of_birth: '6/10/1907',
    hometownCity: 'Fort Lauderdale',
    hometownState: 'FL',
    books: ['fb947bad-b10b-420a-b70b-cc47742fd0a4']
  },
  {
    _id: 'f6464aff-3133-4ee2-872c-33a63df6b0a3',
    first_name: 'Paton',
    last_name: 'Groucock',
    date_of_birth: '2/25/1942',
    hometownCity: 'Kingsport',
    hometownState: 'TN',
    books: ['d60ebca0-091f-48dc-8b0d-00b03a18dc7c']
  },
  {
    _id: '0c802ad2-5013-4589-8267-034d195a88fe',
    first_name: 'Deeanne',
    last_name: 'Rawlinson',
    date_of_birth: '10/20/1959',
    hometownCity: 'Tucson',
    hometownState: 'AZ',
    books: [
      'e27689ae-99e5-4f2b-976b-182770f2cdfa',
      '705b19b8-75d3-4c60-9fa7-c140dc8c6885'
    ]
  },
  {
    _id: '8443be3f-045c-46af-bf63-e066dc20f1ac',
    first_name: 'Wilburt',
    last_name: 'Badrick',
    date_of_birth: '8/4/1935',
    hometownCity: 'Madison',
    hometownState: 'WI',
    books: []
  },
  {
    _id: '04eb84a6-6107-4ad7-8f1e-9aa7ea0ad472',
    first_name: 'Timotheus',
    last_name: 'Dubbin',
    date_of_birth: '12/16/1999',
    hometownCity: 'Fairbanks',
    hometownState: 'AK',
    books: ['5dd12187-8847-48c4-ab30-ca94f43862aa']
  },
  {
    _id: '78c4acd0-25fa-47d6-ae89-9d2edb31bbbc',
    first_name: 'Doralynne',
    last_name: 'Ham',
    date_of_birth: '9/18/1916',
    hometownCity: 'Boston',
    hometownState: 'MA',
    books: [
      '15a97a67-504c-4e80-9d3c-c912c8a288aa',
      '55bf1069-2f4b-44bc-801e-a366aac702fb'
    ]
  },
  {
    _id: '0a1d81a2-ab37-4940-8485-87b409caa8dc',
    first_name: 'Caryl',
    last_name: 'Grabert',
    date_of_birth: '10/27/1970',
    hometownCity: 'Houston',
    hometownState: 'TX',
    books: [
      'a5ecec5f-0097-4beb-a9bd-058a03faab7e',
      'ff59419e-2b2e-430b-8a91-2a94e0018684'
    ]
  },
  {
    _id: '41f61915-3942-4d1b-9a8d-6b4d6f31def3',
    first_name: 'Osmond',
    last_name: 'Shrubb',
    date_of_birth: '12/2/1925',
    hometownCity: 'Phoenix',
    hometownState: 'AZ',
    books: [
      '18a396c8-0859-47c4-8e4d-dca7b054ad9b',
      'fcb4af38-7e60-4d1a-aa64-6237c01b87d6',
      '5298bbae-e3bb-4f57-9fab-4ff75f1a58a1'
    ]
  },
  {
    _id: 'ed35bc3b-f204-4cd1-bc34-ad364e06fc39',
    first_name: 'Karmen',
    last_name: 'MacMeeking',
    date_of_birth: '6/28/1908',
    hometownCity: 'Reno',
    hometownState: 'NV',
    books: [
      'e076a5e7-126d-435b-a7ff-89d931335a09',
      '1128f2bf-4de3-4879-861b-123883846018',
      'a70bfd55-fc3b-4586-a9ec-56e7ef695baf'
    ]
  },
  {
    _id: 'c52ff6f2-cef7-44b0-b04f-d116108819c0',
    first_name: 'Jerrilyn',
    last_name: 'Dimic',
    date_of_birth: '12/25/1908',
    hometownCity: 'Anchorage',
    hometownState: 'AK',
    books: [
      '4338decb-f079-4c94-b1ca-69a58a408872',
      'f204dcb4-e0a8-4136-9f36-df3526428684'
    ]
  },
  {
    _id: '904574ea-489e-4375-883d-2be72aa070be',
    first_name: 'Bruis',
    last_name: 'Olivo',
    date_of_birth: '6/8/1977',
    hometownCity: 'Shawnee Mission',
    hometownState: 'KS',
    books: [
      'e090251f-1e1b-4e24-bd9a-932242e4af34',
      'c7037562-9c5f-43c0-a025-5e6eb0235cef'
    ]
  },
  {
    _id: '29309feb-4a7a-4e55-88d2-747df6f763c5',
    first_name: 'Giordano',
    last_name: 'Gresley',
    date_of_birth: '4/24/1916',
    hometownCity: 'Youngstown',
    hometownState: 'OH',
    books: [
      '4a7f41df-f635-4994-8a0c-de2d41349c68',
      'bc181f85-cb3a-408a-a3f7-a86e9cc24473',
      'dfd7393a-df7d-4a4a-a559-257420e68ba8',
      '0538fbe5-5334-48c7-8b1c-19c2c294d961',
      'd0a26754-30dc-491d-a765-e3200598596b'
    ]
  },
  {
    _id: '932039c9-bcd8-4724-81d8-91f6197b12da',
    first_name: 'Matilde',
    last_name: 'Strass',
    date_of_birth: '8/4/1997',
    hometownCity: 'Denver',
    hometownState: 'CO',
    books: []
  },
  {
    _id: 'c6d946f2-5a8a-4961-8d87-f238202062d0',
    first_name: 'Gabie',
    last_name: 'Balchen',
    date_of_birth: '11/19/1941',
    hometownCity: 'Irvine',
    hometownState: 'CA',
    books: ['69904ca4-820b-4cb6-a4a0-038d64d5474a']
  },
  {
    _id: '263690c4-e415-456f-a69f-ea78a8d22474',
    first_name: 'Kelley',
    last_name: 'Weson',
    date_of_birth: '11/20/1909',
    hometownCity: 'Albuquerque',
    hometownState: 'NM',
    books: [
      '6ed5cfdb-67d1-4afd-938d-ea609d5d7e20',
      '810e8968-a629-4bb8-962a-8be842f9167a',
      'ea2f9418-7968-46e6-9df0-27f083965f96'
    ]
  },
  {
    _id: '36e99f18-8791-4349-a745-8e17467665cf',
    first_name: 'Josefina',
    last_name: 'Ramalhete',
    date_of_birth: '12/28/1904',
    hometownCity: 'Norfolk',
    hometownState: 'VA',
    books: [
      '575a4941-9c24-42fb-9c9e-4ae4ef6b268c',
      'cc6877d8-9712-4836-9dd2-5b698e082b8e',
      'db3d48e7-f9a7-4c7e-ae3c-0afc39db3227'
    ]
  },
  {
    _id: '31406a1a-f2f6-46bb-bd0c-f27304b73763',
    first_name: 'Bella',
    last_name: 'Menci',
    date_of_birth: '9/27/1950',
    hometownCity: 'Des Moines',
    hometownState: 'IA',
    books: [
      '3433b92d-84d7-4b76-8ba5-80eb0e8248a8',
      '36ff37ae-3697-4940-8c86-d13241619bbb'
    ]
  },
  {
    _id: 'bb34a679-7dca-4eb9-8848-b85df166c4a0',
    first_name: 'Schuyler',
    last_name: 'Epp',
    date_of_birth: '12/15/1979',
    hometownCity: 'Des Moines',
    hometownState: 'IA',
    books: ['1cd7d98c-cb0b-402c-8f31-1867302ece81']
  },
  {
    _id: '7d74e440-c190-4b44-ba6c-8eadd2a90576',
    first_name: 'Noni',
    last_name: "O'Monahan",
    date_of_birth: '6/30/1960',
    hometownCity: 'Orlando',
    hometownState: 'FL',
    books: []
  },
  {
    _id: 'bb240d72-b2cd-4ed9-bcdc-63cb63f24474',
    first_name: 'Susy',
    last_name: 'Ost',
    date_of_birth: '4/11/1997',
    hometownCity: 'Jacksonville',
    hometownState: 'FL',
    books: []
  },
  {
    _id: 'd3a8a09b-bd53-42f7-b4b8-660597f89cd7',
    first_name: 'Perrine',
    last_name: 'Greenough',
    date_of_birth: '2/19/1907',
    hometownCity: 'Sacramento',
    hometownState: 'CA',
    books: []
  },
  {
    _id: '1481d077-38f4-4d90-8836-636d05dcdbef',
    first_name: 'Prisca',
    last_name: 'Vakhonin',
    date_of_birth: '4/24/1970',
    hometownCity: 'Harrisburg',
    hometownState: 'PA',
    books: [
      '903dc47e-0f99-4b45-ab8c-5f4cbcdbeac0',
      'cbcc560e-cbdc-48f0-829b-ef11fa50ba40'
    ]
  },
  {
    _id: 'b015046f-5b36-4f1a-bec9-e25b8c0a74f6',
    first_name: 'Adora',
    last_name: 'Bowlesworth',
    date_of_birth: '5/24/1903',
    hometownCity: 'Yonkers',
    hometownState: 'NY',
    books: [
      '40d5233d-9fcf-45e6-81e7-b27b81b3177a',
      'f93b2d12-6914-4e9e-8257-fd12c0a32c80',
      'aab1ff1f-5c4b-4b25-aaf2-8ddaca4778dd',
      '39a00b44-6297-4cac-859d-2407a85c3858',
      '776621d0-90ba-47f4-83aa-a816a603da64',
      '58c6e542-57cd-4ffa-ab94-89751a9714df'
    ]
  },
  {
    _id: 'fe7032fe-9fb2-44ea-b3a1-d635617cd17d',
    first_name: 'Tanya',
    last_name: 'Pickston',
    date_of_birth: '7/11/1915',
    hometownCity: 'Valley Forge',
    hometownState: 'PA',
    books: ['218fd93a-807c-466a-9bea-7f9e1c3f99d7']
  },
  {
    _id: 'e6f5f286-aca9-43e7-970a-21a444677ab5',
    first_name: 'Finlay',
    last_name: 'Van Haeften',
    date_of_birth: '12/2/1962',
    hometownCity: 'Glendale',
    hometownState: 'AZ',
    books: [
      '22ba56fd-0828-4723-b47f-093dff189e62',
      'ad012c61-b8d7-4b7e-8925-18a7d5341c60'
    ]
  },
  {
    _id: '3da1856a-3072-493d-8f30-77e3381a9f1d',
    first_name: 'Tamiko',
    last_name: 'Ceaser',
    date_of_birth: '3/27/1966',
    hometownCity: 'Roanoke',
    hometownState: 'VA',
    books: [
      'ffcbfd74-d036-435b-a6b6-a8fed56cdb6d',
      'd1b0f747-e45c-4f7f-9d7e-e5ee1262312b'
    ]
  },
  {
    _id: '13d7cabe-6f52-4c03-ac10-26b6258c379e',
    first_name: 'Lyndsey',
    last_name: 'Allatt',
    date_of_birth: '11/14/1900',
    hometownCity: 'Buffalo',
    hometownState: 'NY',
    books: []
  },
  {
    _id: '21c7feb9-9b3c-4535-8e98-9a2bc8696d3b',
    first_name: 'Regan',
    last_name: 'Creamer',
    date_of_birth: '1/19/1949',
    hometownCity: 'Houston',
    hometownState: 'TX',
    books: []
  },
  {
    _id: '882dae67-dbf4-442a-9efd-2175c140f0f0',
    first_name: 'Buck',
    last_name: 'Stiegars',
    date_of_birth: '12/9/1929',
    hometownCity: 'Sparks',
    hometownState: 'NV',
    books: [
      '7dbcc445-9bf8-47cd-9fae-a25074ad0049',
      'c42d4d89-4dbf-4221-b1b9-8087da5665b1',
      '2636b740-bb27-4ce0-93cb-ffbc979fcdeb'
    ]
  },
  {
    _id: '833ffd7f-ba4c-42bb-8671-1f38985707e3',
    first_name: 'West',
    last_name: 'Postin',
    date_of_birth: '1/30/1982',
    hometownCity: 'Irvine',
    hometownState: 'CA',
    books: [
      '0c273419-0adc-479b-be9e-9b74f312a0bc',
      'f707e4ec-78b9-4b89-bbb5-df40d316a8e9',
      'c89ec277-a00d-4fcc-b581-1e4b8ccc3227',
      'f8e8eb2a-8a33-4755-b69d-a5cfb2832c25'
    ]
  },
  {
    _id: '90bfbe58-8cd0-4052-9c32-45c611c51e91',
    first_name: 'Osgood',
    last_name: 'Dollard',
    date_of_birth: '11/30/1907',
    hometownCity: 'San Francisco',
    hometownState: 'CA',
    books: [
      '74968546-0c84-4b2b-90c4-10e2442f442e',
      'b9118c4f-24e9-4cd6-9cef-599bd22e6e3a',
      'a7195f90-9d95-48c6-844f-e56d5217b943'
    ]
  },
  {
    _id: 'ff58ae27-6e52-4231-8ae5-daa957eebac3',
    first_name: 'Rianon',
    last_name: 'Tomkins',
    date_of_birth: '6/5/1961',
    hometownCity: 'Stockton',
    hometownState: 'CA',
    books: [
      '4c96d4d1-07bb-4b9f-a0c8-7dcd6db08919',
      '84985e47-64c4-4af9-99dc-ffaf65672169',
      'b5794cc7-d7aa-423f-b0af-d1904d75a266'
    ]
  },
  {
    _id: '7a055765-959d-44b0-bcf6-2c07589aec11',
    first_name: 'Joly',
    last_name: 'Roughsedge',
    date_of_birth: '3/30/1906',
    hometownCity: 'Appleton',
    hometownState: 'WI',
    books: [
      '32a75292-f5f4-4730-b421-9e37cb0eda92',
      '9ddd27b8-7a97-4b10-938a-8934fcff7c56'
    ]
  },
  {
    _id: 'b1be653b-93b3-4421-bce7-430d6d97f098',
    first_name: 'Marcie',
    last_name: 'Dunston',
    date_of_birth: '1/25/1942',
    hometownCity: 'Eugene',
    hometownState: 'OR',
    books: [
      'a6120800-4abe-47f2-b991-4cf907ed8717',
      '157bbd3a-2343-498b-ac4a-9f1c81c54843',
      'ff074666-254e-4582-a035-a91102c474c0'
    ]
  },
  {
    _id: '449d8d31-cf8d-4db5-8e9b-2eddc19503e6',
    first_name: 'Farah',
    last_name: 'Sherborn',
    date_of_birth: '12/2/1955',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: [
      '4295cda6-bf25-469d-8b5f-0b313fc6a57b',
      '4bbd020e-610e-4cf5-ba72-bf69bb5a7f22'
    ]
  },
  {
    _id: '55ee063d-df44-4f92-bed4-e7f833f0c1b8',
    first_name: 'Terrence',
    last_name: 'Napolitano',
    date_of_birth: '1/7/1982',
    hometownCity: 'Charlotte',
    hometownState: 'NC',
    books: [
      'df516dd0-7ca6-41de-bdae-13899ff696eb',
      '9ff2a3fe-48b3-45c3-8577-0f22981efae3',
      'ea7d723a-3876-41e4-baee-249570f22179',
      '06a7e79e-f88a-4e67-8c22-e6f13064fb37',
      '27e933e5-168b-4baf-b7fe-53eee82d31b9'
    ]
  },
  {
    _id: '61b280eb-5b7a-40ee-a90d-6d83905d326f',
    first_name: 'Sybilla',
    last_name: 'Girardoni',
    date_of_birth: '7/20/1937',
    hometownCity: 'El Paso',
    hometownState: 'TX',
    books: []
  },
  {
    _id: '7e5ac46a-3b7e-480f-a394-26aa9b8fc722',
    first_name: 'Issy',
    last_name: 'Gonzalez',
    date_of_birth: '11/18/2001',
    hometownCity: 'Tucson',
    hometownState: 'AZ',
    books: [
      '3d443b49-2480-4055-aabb-560658cf8c7f',
      '12a2ed17-b45b-4f8d-9354-98c7b9283c54',
      'e2254f43-0b12-4f9d-b8a9-3c3ec12c3415',
      '6c420bb9-c9ee-4bd9-ac21-ff970ec42cf3'
    ]
  },
  {
    _id: '34388794-db0d-4545-b944-874bb3ef81c7',
    first_name: 'Arny',
    last_name: 'Powe',
    date_of_birth: '11/27/1987',
    hometownCity: 'Birmingham',
    hometownState: 'AL',
    books: [
      '431d0b7f-cfab-4b1b-ba11-bfcecfaf1821',
      'c931d3ef-a36c-4850-8cff-52d31a746369'
    ]
  },
  {
    _id: 'd02e41ff-c7c8-45fc-bd60-517bfbd21f8f',
    first_name: 'Doti',
    last_name: 'Lundbech',
    date_of_birth: '1/20/1946',
    hometownCity: 'Vancouver',
    hometownState: 'WA',
    books: ['8ea95ef4-6bce-4110-984e-d9b7d3c4efee']
  },
  {
    _id: '8cfc3b77-0fbe-48c7-84f5-2bd95dc93cd6',
    first_name: 'Dorthea',
    last_name: 'Peasey',
    date_of_birth: '8/9/1955',
    hometownCity: 'Miami Beach',
    hometownState: 'FL',
    books: [
      'c621f88d-1693-497b-bdcb-ebec508eb5c5',
      'e0b75c0e-68e9-4256-9440-205a820e2591'
    ]
  },
  {
    _id: 'dd38fe9b-85a3-4980-8602-3cf1f64bd15a',
    first_name: 'Bron',
    last_name: 'Ettles',
    date_of_birth: '4/4/1927',
    hometownCity: 'Long Beach',
    hometownState: 'CA',
    books: []
  },
  {
    _id: '8c9f39a6-2468-417d-9003-289fd8f5c5d0',
    first_name: 'Joshuah',
    last_name: 'Chiene',
    date_of_birth: '12/23/1901',
    hometownCity: 'Boise',
    hometownState: 'ID',
    books: ['8beead67-2370-4099-ba30-44f0ed524065']
  },
  {
    _id: 'cd7fd448-9c43-4f39-835d-a3030b116a63',
    first_name: 'Benedick',
    last_name: 'Beales',
    date_of_birth: '10/6/2003',
    hometownCity: 'Boston',
    hometownState: 'MA',
    books: []
  },
  {
    _id: '71d6bac3-13d3-48ec-adc5-50169e4567a0',
    first_name: 'Cairistiona',
    last_name: 'Coyle',
    date_of_birth: '8/26/1940',
    hometownCity: 'Miami',
    hometownState: 'FL',
    books: [
      'e59481cd-197f-474d-a2b1-58afdff0a9d4',
      'e97320da-3e5e-429c-894b-a320a295bf16',
      '584e88aa-b946-4877-964e-71f02ac26d40'
    ]
  },
  {
    _id: '05aed9ce-ffa9-42fc-a9b2-cd1b52551bf1',
    first_name: 'Norman',
    last_name: 'Elnaugh',
    date_of_birth: '7/9/1942',
    hometownCity: 'Kansas City',
    hometownState: 'MO',
    books: [
      'a60f59ab-4f13-4014-ad9e-2bb38890c2a3',
      '1393af89-7b25-45fb-88a0-cd10e6f51946',
      'b9054859-f1f8-49aa-aa5b-18005427ab86'
    ]
  },
  {
    _id: '622fa91a-2c5f-49dd-b86a-548421b93e76',
    first_name: 'Vitia',
    last_name: 'Kobke',
    date_of_birth: '1/7/1958',
    hometownCity: 'Los Angeles',
    hometownState: 'CA',
    books: ['e6db7f5a-3cba-4838-bc33-15d0c316730c']
  },
  {
    _id: '140bb64f-c2ca-4250-97a7-7d5c395d1ea2',
    first_name: 'Danya',
    last_name: 'Mc Elory',
    date_of_birth: '1/16/1954',
    hometownCity: 'Tampa',
    hometownState: 'FL',
    books: [
      'ab84bc7e-1f25-434f-9586-b03e88d30f9e',
      '3171202b-358f-4eb1-a552-615c7f88113c',
      'b3b4ca69-cd59-4c8f-abc4-05d9880e6a2e',
      'cdd99be3-5359-422d-9a83-3cc04a650802',
      '0a740411-11f1-4422-9cd2-7e4f39941c2d'
    ]
  },
  {
    _id: '7f7e7b51-d379-46b3-a316-28c4f0d11791',
    first_name: 'Casey',
    last_name: 'Fley',
    date_of_birth: '9/15/1927',
    hometownCity: 'Anderson',
    hometownState: 'SC',
    books: ['28447a7d-7c71-43a2-a1fc-2db73af9debc']
  },
  {
    _id: '7114a25a-a4b0-470e-8259-78639a046371',
    first_name: 'Anna',
    last_name: 'Hudleston',
    date_of_birth: '2/24/1949',
    hometownCity: 'Washington',
    hometownState: 'DC',
    books: ['5d7a28c2-e076-47c3-a327-cbd123b423f0']
  },
  {
    _id: '19744cae-ce5c-4c33-94bf-3882aee39f5f',
    first_name: 'Stirling',
    last_name: 'Faye',
    date_of_birth: '7/24/1958',
    hometownCity: 'Lincoln',
    hometownState: 'NE',
    books: [
      '80b119ed-c22c-439f-b570-7390cae85465',
      'd39658e0-9c1b-4ee5-9ca1-93840a0ffa7f'
    ]
  },
  {
    _id: 'f36cd039-12da-4747-9bb8-ec8666fe62f3',
    first_name: 'Marve',
    last_name: 'Grinham',
    date_of_birth: '12/27/1903',
    hometownCity: 'Erie',
    hometownState: 'PA',
    books: [
      'fe64fc98-95ff-4d47-bac8-93c755b85c95',
      '8d310d7c-0322-4ac8-8e33-fbeeb09cc82f',
      '36b2ea1b-23fd-4a95-b86a-fd077abcfdff',
      '45f1b0ef-5a18-4344-8c6c-1eeeafcf972e',
      '6d9e96fd-f7c9-48e9-9fe5-09555e6673e6',
      '66a83120-999c-4d6f-9803-b6320f477eb6',
      '7e3b4c92-13be-40f5-95bb-5ecf09ad1e29'
    ]
  },
  {
    _id: '3bcc6789-fcd8-4cab-9cb2-ec537d884893',
    first_name: 'Mortie',
    last_name: 'Crump',
    date_of_birth: '1/10/2002',
    hometownCity: 'Meridian',
    hometownState: 'MS',
    books: []
  },
  {
    _id: '3dad07d6-9ca7-498e-a4b7-f9565dd54367',
    first_name: 'Paige',
    last_name: 'Thowes',
    date_of_birth: '10/8/1931',
    hometownCity: 'Amarillo',
    hometownState: 'TX',
    books: [
      '40d5ef80-d719-4053-9ea7-302ae8c5b9f3',
      'b2c44577-995b-466d-a4f2-0812ac0183ed'
    ]
  }
];

let bookList = [
  {
    _id: '519c733a-6a5d-451f-927d-0e860b5d1e3d',
    title: 'Prime Suspect 3',
    genres: ['Science Fiction'],
    publicationDate: '3/22/1959',
    publisher: 'Skilith',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '445798791-3',
    language: 'Tetum',
    pageCount: 960,
    price: 18.35,
    format: ['Paperback'],
    authorId: '3f8bf018-4b09-4f9d-8206-e079ad314a46'
  },
  {
    _id: 'fe64fc98-95ff-4d47-bac8-93c755b85c95',
    title: 'White Hunter, Black Heart',
    genres: ['Travel', 'Personal Development'],
    publicationDate: '4/23/1938',
    publisher: 'Podcat',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '068799766-6',
    language: 'New Zealand Sign Language',
    pageCount: 442,
    price: 56.84,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'f36cd039-12da-4747-9bb8-ec8666fe62f3'
  },
  {
    _id: '40913fde-1113-47d7-a4d1-56ccf09ef08e',
    title: 'Bambou',
    genres: ['Guide / How-to'],
    publicationDate: '4/16/1981',
    publisher: 'Voomm',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '339021328-7',
    language: 'Guaraní',
    pageCount: 127,
    price: 7.83,
    format: ['E-Book'],
    authorId: '2ddfc0e1-93ef-4ec2-ae77-7d5525305473'
  },
  {
    _id: 'cf4c4706-304a-4a90-a0b5-29f8721b439b',
    title: 'Assassination of a High School President',
    genres: [
      'Personal Development',
      'Bildungsroman',
      'Art',
      'Romance',
      'Dystopian'
    ],
    publicationDate: '7/28/1945',
    publisher: 'Zoozzy',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '336246300-2',
    language: 'Mongolian',
    pageCount: 50,
    price: 12.28,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '6ff250c1-ddaa-4abc-aeb2-8884a9f49a71'
  },
  {
    _id: '569813c2-237e-4879-a5dc-bf5441d91fd5',
    title: 'Scissere',
    genres: ['Horror'],
    publicationDate: '5/10/1951',
    publisher: 'Aivee',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '580391603-X',
    language: 'Albanian',
    pageCount: 842,
    price: 42.67,
    format: ['Paperback'],
    authorId: '4de7f77b-dad4-4c05-af13-24f2b1dd4914'
  },
  {
    _id: 'f3eabffa-0ea9-48e2-b25d-2711c91a035e',
    title: 'Next Karate Kid, The',
    genres: ['Bildungsroman'],
    publicationDate: '6/20/1929',
    publisher: 'Centizu',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '104100623-3',
    language: 'Tajik',
    pageCount: 618,
    price: 13.63,
    format: ['Hardcover', 'E-Book'],
    authorId: 'd8d43bcb-285b-492b-a3eb-d599563b6e8e'
  },
  {
    _id: '04e55bc9-0c7a-47a6-a403-52eabf25c6ef',
    title: 'Shattered Image',
    genres: ['Mystery'],
    publicationDate: '5/30/2004',
    publisher: 'Tekfly',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '214788141-4',
    language: 'Ndebele',
    pageCount: 439,
    price: 15.91,
    format: ['Paperback', 'Hardcover'],
    authorId: 'cd66289a-dd71-4130-b2bc-19723cf0fa08'
  },
  {
    _id: 'c4ccc400-cf1a-49d3-ba2f-df4093488bfb',
    title: 'Curse of the Oily Man (Sumpah orang minyak) ',
    genres: ['Science Fiction'],
    publicationDate: '6/17/1934',
    publisher: 'Buzzdog',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '212656101-1',
    language: 'Telugu',
    pageCount: 463,
    price: 27.48,
    format: ['E-Book', 'Hardcover'],
    authorId: 'c6b583b0-8011-496d-a23b-8d6e62d43a38'
  },
  {
    _id: '3d46a739-fd92-4ff5-9bf3-95da90d22f66',
    title: 'Lo',
    genres: ['Adventure', 'Paranormal'],
    publicationDate: '9/12/1965',
    publisher: 'Mynte',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '028595319-2',
    language: 'Indonesian',
    pageCount: 647,
    price: 82.48,
    format: ['Paperback'],
    authorId: '9ab6487c-31f9-4b8f-8010-b6104fff041b'
  },
  {
    _id: 'a60f59ab-4f13-4014-ad9e-2bb38890c2a3',
    title: 'West Is West',
    genres: ['Romance', 'Horror'],
    publicationDate: '10/9/1917',
    publisher: 'Edgepulse',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '433254208-8',
    language: 'Tamil',
    pageCount: 205,
    price: 60.3,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '05aed9ce-ffa9-42fc-a9b2-cd1b52551bf1'
  },
  {
    _id: '3d99f19a-7fc0-47f1-ae0a-b040a588e80f',
    title: 'Laid To Rest',
    genres: ['Art'],
    publicationDate: '6/20/1909',
    publisher: 'Skyndu',
    summary: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '724781437-3',
    language: 'Kazakh',
    pageCount: 524,
    price: 30.71,
    format: ['Paperback'],
    authorId: '74de41dc-31c4-4b95-b411-0b7b504c79e8'
  },
  {
    _id: '6ed5cfdb-67d1-4afd-938d-ea609d5d7e20',
    title: 'Saboteur',
    genres: ['Paranormal', 'Adventure'],
    publicationDate: '1/10/1958',
    publisher: 'Trudoo',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '362320558-3',
    language: 'Kyrgyz',
    pageCount: 395,
    price: 55.84,
    format: ['Paperback'],
    authorId: '263690c4-e415-456f-a69f-ea78a8d22474'
  },
  {
    _id: '22ba56fd-0828-4723-b47f-093dff189e62',
    title: 'Jesus Christ Superstar',
    genres: ['Science Fiction'],
    publicationDate: '7/7/1922',
    publisher: 'Dabvine',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '169313593-0',
    language: 'Gagauz',
    pageCount: 784,
    price: 46.39,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'e6f5f286-aca9-43e7-970a-21a444677ab5'
  },
  {
    _id: '15acd61c-d718-4d28-9715-bfa6d301fe43',
    title: 'Pinocchio',
    genres: ['Contemporary', 'Dystopian', 'Bildungsroman', 'Adventure'],
    publicationDate: '7/2/2008',
    publisher: 'Eire',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '687008365-7',
    language: 'Sotho',
    pageCount: 318,
    price: 8.83,
    format: ['Hardcover'],
    authorId: '3e4f3efe-2514-4846-bedb-6c7c86df9b80'
  },
  {
    _id: 'd337cf67-a121-48aa-a29e-1a2237de1cce',
    title: 'Navy Seals',
    genres: ['Motivational', 'Southern Gothic Fiction'],
    publicationDate: '9/23/1975',
    publisher: 'Realpoint',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '786862328-4',
    language: 'Tswana',
    pageCount: 521,
    price: 98.21,
    format: ['Hardcover', 'E-Book'],
    authorId: '63a2a9d6-1f33-449c-8ea7-44a19f9a4f93'
  },
  {
    _id: 'd6bf9799-e794-4632-8da9-5252d1664a5b',
    title: 'The Woman in Black 2: Angel of Death',
    genres: ['Romance', 'Humor', 'Travel', 'Adventure', 'Contemporary'],
    publicationDate: '5/4/1907',
    publisher: 'Devcast',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '748453792-6',
    language: 'Arabic',
    pageCount: 768,
    price: 45.87,
    format: ['E-Book', 'Hardcover'],
    authorId: '2dac4009-8b45-4707-8701-2a5263d329bd'
  },
  {
    _id: 'df516dd0-7ca6-41de-bdae-13899ff696eb',
    title: 'Under the Skin',
    genres: ['Historical fiction'],
    publicationDate: '1/24/1930',
    publisher: 'Zoozzy',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '368584857-7',
    language: 'Hiri Motu',
    pageCount: 666,
    price: 53.01,
    format: ['E-Book'],
    authorId: '55ee063d-df44-4f92-bed4-e7f833f0c1b8'
  },
  {
    _id: '112fa08b-9c95-4178-bc27-a0bf00a96d20',
    title: 'In the Fog (V tumane)',
    genres: ['Mystery', 'Thriller'],
    publicationDate: '2/5/1984',
    publisher: 'Mydo',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    isbn: '934271609-1',
    language: 'Bengali',
    pageCount: 133,
    price: 68.06,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '38cb7ec6-0150-4382-bb7b-79fc3d8ef293'
  },
  {
    _id: '680758fa-6d21-422e-9e27-234d4bf9c2e2',
    title: 'Muppet Musicians of Bremen, The',
    genres: [
      'Personal Development',
      'Cookbook',
      'Science Fiction',
      'Fiction',
      'Romance'
    ],
    publicationDate: '3/6/2023',
    publisher: 'Agivu',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '554842521-8',
    language: 'Afrikaans',
    pageCount: 215,
    price: 38.03,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '0730f806-6e3f-4aaf-a34a-0b57f5045916'
  },
  {
    _id: '2f97ccec-17fb-486e-b249-d18c6ead7fa7',
    title: 'Star Maps',
    genres: ['Motivational', 'Southern Gothic Fiction', 'Historical fiction'],
    publicationDate: '12/10/1903',
    publisher: 'Realfire',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '428286707-8',
    language: 'Swati',
    pageCount: 64,
    price: 38.34,
    format: ['Paperback'],
    authorId: '001f1281-2ae9-4979-bd3a-c44dd3381af6'
  },
  {
    _id: 'c38589d1-26df-4001-bd1a-3a934616be48',
    title: 'Ryan',
    genres: ['Guide / How-to', 'Children’s'],
    publicationDate: '12/3/1941',
    publisher: 'Babbleopia',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '720852052-6',
    language: 'Arabic',
    pageCount: 914,
    price: 68.41,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '21d34ada-c6e8-4b30-a25e-399eacb27ef9'
  },
  {
    _id: '1a5cad0d-345a-4958-8201-09c255d9e044',
    title: 'Philadelphia Experiment II',
    genres: ['Humor', 'Art'],
    publicationDate: '2/5/1962',
    publisher: 'Kare',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '022371802-5',
    language: 'Punjabi',
    pageCount: 299,
    price: 97.81,
    format: ['Hardcover', 'E-Book'],
    authorId: 'c12eb14f-1e38-4ed2-a200-2900f7b6ccad'
  },
  {
    _id: '5d7a28c2-e076-47c3-a327-cbd123b423f0',
    title: "You're Next",
    genres: ['Fiction'],
    publicationDate: '9/15/1902',
    publisher: 'Thoughtstorm',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '879694960-0',
    language: 'Aymara',
    pageCount: 2,
    price: 6.32,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '7114a25a-a4b0-470e-8259-78639a046371'
  },
  {
    _id: '1561a24b-87d7-4ddc-b7c0-8b113958fcd1',
    title: 'Emma',
    genres: ['Historical fiction', 'Health', 'Contemporary', 'Art'],
    publicationDate: '1/20/2005',
    publisher: 'Twitterworks',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '214425576-8',
    language: 'Dari',
    pageCount: 898,
    price: 27.34,
    format: ['E-Book'],
    authorId: '44146811-c29c-44a3-a186-010f7b5d9376'
  },
  {
    _id: 'e7de5428-c687-43e9-9793-f1ad55445838',
    title: 'Indictment: The McMartin Trial',
    genres: ['Thriller', 'Humor'],
    publicationDate: '9/25/2019',
    publisher: 'Shufflester',
    summary: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '750017875-1',
    language: 'Hiri Motu',
    pageCount: 587,
    price: 62.48,
    format: ['E-Book', 'Paperback'],
    authorId: 'ad923796-1ad6-4a1d-88b6-454a04412573'
  },
  {
    _id: 'f1a8bffe-f257-424e-b339-3d364ffba559',
    title: 'Aliens of the Deep',
    genres: [
      'Paranormal',
      'Romance',
      'Adventure',
      'Science Fiction',
      'Families & Relationships'
    ],
    publicationDate: '11/26/2017',
    publisher: 'Realbridge',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '202184537-0',
    language: 'Tok Pisin',
    pageCount: 904,
    price: 75.74,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '23896b07-323f-4865-99fb-cb2f5ee11881'
  },
  {
    _id: '3f0ee995-e4ea-4d54-ac4e-5d0cd7890132',
    title: 'One Last Hug',
    genres: [
      'Southern Gothic Fiction',
      'Contemporary',
      'History',
      'Paranormal',
      'Children’s'
    ],
    publicationDate: '7/14/1945',
    publisher: 'Centizu',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '747997490-6',
    language: 'Hungarian',
    pageCount: 674,
    price: 16.81,
    format: ['Paperback'],
    authorId: '36f9f627-791c-4476-8a6c-cae6807be704'
  },
  {
    _id: '62371918-4fe4-4bc9-8c59-99a4e640aad1',
    title: 'Death in Brunswick',
    genres: ['Humor', 'Historical fiction', 'Gothic', 'Children’s'],
    publicationDate: '11/4/1989',
    publisher: 'Browsetype',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '693357978-6',
    language: 'Thai',
    pageCount: 306,
    price: 43.4,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '3fe6ba2c-45af-4c96-a607-91aa273eb41b'
  },
  {
    _id: '4a255688-fe56-4697-b26b-1127031fc253',
    title: 'Machine That Kills Bad People, The (La Macchina Ammazzacattivi)',
    genres: ['Science Fiction'],
    publicationDate: '11/15/2003',
    publisher: 'Youspan',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '124430552-9',
    language: 'Guaraní',
    pageCount: 283,
    price: 54.5,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'b76505c2-9510-4e62-bdb6-db2a2906059b'
  },
  {
    _id: '2dd023b7-bb50-4f50-96c5-b67bd863f7ef',
    title: 'Soapdish',
    genres: ['Self-help'],
    publicationDate: '8/4/2015',
    publisher: 'Kanoodle',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '469753564-2',
    language: 'Greek',
    pageCount: 920,
    price: 52.15,
    format: ['Hardcover'],
    authorId: '757e021b-a7e0-40e4-9e4f-3b944433f545'
  },
  {
    _id: '9be9c068-9dba-46a9-92d0-e2d9d6b3e96f',
    title: 'In Enemy Hands',
    genres: ['Travel', 'Fiction', 'Horror', 'Children’s', 'Art'],
    publicationDate: '12/12/1980',
    publisher: 'Quinu',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '261930215-3',
    language: 'Swahili',
    pageCount: 893,
    price: 38.17,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '9c8568f1-4fdc-410d-b0ad-eff71ced0abe'
  },
  {
    _id: '31c011e6-3041-45da-95bc-0505d298c3d2',
    title: 'Om Shanti Om',
    genres: [
      'Mystery',
      'Dystopian',
      'Families & Relationships',
      'Horror',
      'Children’s'
    ],
    publicationDate: '9/28/1990',
    publisher: 'Minyx',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '793299592-2',
    language: 'Indonesian',
    pageCount: 578,
    price: 10.16,
    format: ['Hardcover', 'Paperback'],
    authorId: '935e284a-3232-49e2-a619-a4ebcff82601'
  },
  {
    _id: 'ed2ca376-cbe3-47f7-af34-7a033de51a02',
    title: '3 Ninjas Knuckle Up',
    genres: ['Cookbook'],
    publicationDate: '11/18/1994',
    publisher: 'Oyoba',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '971195658-6',
    language: 'Filipino',
    pageCount: 905,
    price: 48.22,
    format: ['Hardcover', 'Paperback'],
    authorId: '757e021b-a7e0-40e4-9e4f-3b944433f545'
  },
  {
    _id: 'ca72aaf7-d8b9-46d5-b6db-d0a47b73e2ea',
    title: 'Jay and Silent Bob Strike Back',
    genres: ['Southern Gothic Fiction', 'History'],
    publicationDate: '10/2/2017',
    publisher: 'Skippad',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '238694931-1',
    language: 'Gujarati',
    pageCount: 110,
    price: 70.54,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'cb503a3f-1b42-425c-bceb-93014711f259'
  },
  {
    _id: '99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e',
    title: 'No habrá paz para los malvados',
    genres: ['Art', 'Travel'],
    publicationDate: '5/7/2018',
    publisher: 'Avamm',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '520476104-7',
    language: 'Finnish',
    pageCount: 693,
    price: 25.66,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'f645d28a-670a-457a-b55f-a32876b8511d'
  },
  {
    _id: '638686c2-e098-4d5f-860b-78b31a4ccc9d',
    title: 'Gumby: The Movie',
    genres: ['Gothic'],
    publicationDate: '1/14/1928',
    publisher: 'Muxo',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '468043207-1',
    language: 'Dari',
    pageCount: 130,
    price: 73.06,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '1fdccafd-71f6-43f4-bd87-32164f1441a9'
  },
  {
    _id: '82c2903c-d0b5-4ec0-8a46-38485d65b93d',
    title: 'Love Letter, The',
    genres: [
      'Personal Development',
      'Motivational',
      'Science Fiction',
      'Children’s',
      'History'
    ],
    publicationDate: '9/23/2003',
    publisher: 'Twitterworks',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '027959989-7',
    language: 'English',
    pageCount: 836,
    price: 52.28,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '96ba8dcc-2e8e-4e6a-86ab-b2bd370c9324'
  },
  {
    _id: 'ac1ba9c8-cb32-485d-99bd-65e249c2f5c5',
    title: 'Eddie Izzard: Force Majeure Live',
    genres: ['Fiction', 'Cookbook', 'Gothic', 'Historical fiction'],
    publicationDate: '8/24/2013',
    publisher: 'Bubblebox',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    isbn: '484125582-6',
    language: 'Dhivehi',
    pageCount: 953,
    price: 45.6,
    format: ['E-Book'],
    authorId: '975ada82-0816-4ebc-b6e2-410a0ebf2f4b'
  },
  {
    _id: '4295cda6-bf25-469d-8b5f-0b313fc6a57b',
    title: 'Dodge City',
    genres: ['Horror'],
    publicationDate: '10/31/1918',
    publisher: 'Eazzy',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '385718104-4',
    language: 'Somali',
    pageCount: 918,
    price: 87.16,
    format: ['Paperback', 'Hardcover'],
    authorId: '449d8d31-cf8d-4db5-8e9b-2eddc19503e6'
  },
  {
    _id: '98682279-52bc-4b64-829a-7ef5eb3815ed',
    title: 'Grace',
    genres: ['Science Fiction', 'Personal Development', 'Historical fiction'],
    publicationDate: '9/17/1936',
    publisher: 'Quamba',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '293578322-0',
    language: 'English',
    pageCount: 36,
    price: 29.76,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'da78d931-1396-40a5-b042-5a20ad83c80e'
  },
  {
    _id: 'd05a3185-3e22-4a7f-b164-81ad3bebc1e2',
    title: 'Fists in the Pocket (Pugni in tasca, I)',
    genres: ['Paranormal', 'Dystopian'],
    publicationDate: '1/22/2007',
    publisher: 'Blogpad',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '070428177-5',
    language: 'Kazakh',
    pageCount: 930,
    price: 88.26,
    format: ['Paperback', 'E-Book'],
    authorId: '339b2ea7-982b-4b3c-be95-5450a0c5f865'
  },
  {
    _id: '2a195547-19a8-42bf-9c2a-735b0499f8f2',
    title: 'Simon Magus',
    genres: ['Horror', 'Humor', 'History', 'Travel'],
    publicationDate: '2/29/2000',
    publisher: 'Rooxo',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '508621237-5',
    language: 'Bengali',
    pageCount: 143,
    price: 29.91,
    format: ['Hardcover'],
    authorId: '6b979044-6c52-4d95-944d-b0f08c724f1c'
  },
  {
    _id: 'd535eb5e-9825-4f24-a90a-d5f6d5f56d38',
    title: 'Revengers Tragedy',
    genres: ['Romance', 'Humor'],
    publicationDate: '1/16/1923',
    publisher: 'Kwinu',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '226499054-6',
    language: 'Spanish',
    pageCount: 660,
    price: 99.24,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '96d8604e-0e99-4bd1-bcc6-1a0800b317c2'
  },
  {
    _id: '92b2a991-bb3b-4393-a732-1c8518115ed4',
    title: 'The Red Inn',
    genres: ['Gothic', 'Fiction'],
    publicationDate: '1/21/1994',
    publisher: 'Jayo',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '507184956-9',
    language: 'Armenian',
    pageCount: 685,
    price: 87.02,
    format: ['Paperback'],
    authorId: '63a2a9d6-1f33-449c-8ea7-44a19f9a4f93'
  },
  {
    _id: '74ec757d-0ddd-4035-a8ff-2f10888d393d',
    title: 'Rogue Trader',
    genres: ['Dystopian', 'Southern Gothic Fiction', 'Motivational', 'Art'],
    publicationDate: '3/24/1934',
    publisher: 'Nlounge',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '064253476-4',
    language: 'Lithuanian',
    pageCount: 14,
    price: 14.05,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '9471e481-42b7-4d27-bfe6-b67db8569b75'
  },
  {
    _id: 'ab84bc7e-1f25-434f-9586-b03e88d30f9e',
    title: 'Jaws 2',
    genres: [
      'Health',
      'Families & Relationships',
      'Children’s',
      'Romance',
      'Fiction'
    ],
    publicationDate: '8/29/1913',
    publisher: 'Skyndu',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '286607813-6',
    language: 'Hiri Motu',
    pageCount: 424,
    price: 36.4,
    format: ['Paperback'],
    authorId: '140bb64f-c2ca-4250-97a7-7d5c395d1ea2'
  },
  {
    _id: 'd603e29b-8201-4d2c-be5a-c8fea4cf2416',
    title: 'Cavemen',
    genres: [
      'Travel',
      'History',
      'Bildungsroman',
      'Thriller',
      'Southern Gothic Fiction'
    ],
    publicationDate: '1/21/1952',
    publisher: 'Kamba',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '703934593-5',
    language: 'Portuguese',
    pageCount: 35,
    price: 61.09,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '5972400d-aad0-4de3-8230-77dbcfc6020f'
  },
  {
    _id: '549f8321-dd2d-488d-91d4-e21b30236cb0',
    title:
      'Swordsman II (Legend of the Swordsman, The) (Xiao ao jiang hu zhi: Dong Fang Bu Bai)',
    genres: ['Mystery', 'Thriller'],
    publicationDate: '8/4/1946',
    publisher: 'Blogpad',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '449373170-2',
    language: 'Catalan',
    pageCount: 19,
    price: 46.82,
    format: ['E-Book', 'Hardcover'],
    authorId: '6c17ed87-adc0-4b74-a785-4cf52b7a5a6d'
  },
  {
    _id: '4d72791a-2826-48d0-8a2e-13a0dae424cf',
    title: 'Pulp',
    genres: ['Historical fiction'],
    publicationDate: '5/4/2004',
    publisher: 'Zoomlounge',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '980419386-8',
    language: 'French',
    pageCount: 619,
    price: 62.12,
    format: ['Hardcover', 'E-Book'],
    authorId: '5dd4474d-13d0-4fc1-85f7-aa8830c26d57'
  },
  {
    _id: '7150e4e6-2caf-4790-9917-9dff53d5b1a3',
    title:
      'Fragile Trust: Plagiarism, Power, and Jayson Blair at the New York Times, A',
    genres: ['Cookbook', 'Health', 'Thriller', 'Art'],
    publicationDate: '7/29/1985',
    publisher: 'Browseblab',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '275970098-4',
    language: 'Croatian',
    pageCount: 335,
    price: 68.97,
    format: ['Hardcover'],
    authorId: '66a2d10a-f895-4e93-9eb6-3abfa87bc211'
  },
  {
    _id: '4c96d4d1-07bb-4b9f-a0c8-7dcd6db08919',
    title: 'Evil Dead, The',
    genres: ['Fiction', 'Dystopian', 'Memoir'],
    publicationDate: '11/6/1905',
    publisher: 'Nlounge',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '655529672-0',
    language: 'Fijian',
    pageCount: 608,
    price: 15.47,
    format: ['Hardcover', 'Paperback'],
    authorId: 'ff58ae27-6e52-4231-8ae5-daa957eebac3'
  },
  {
    _id: 'bccb514c-defe-4a67-94a8-5070dc45056b',
    title: 'Jay Mohr: Funny for a Girl',
    genres: ['Fiction', 'History'],
    publicationDate: '10/13/2014',
    publisher: 'Tekfly',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '989618866-1',
    language: 'Hindi',
    pageCount: 824,
    price: 41.52,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '76ade80d-1b0e-49ef-8e20-a1d2b193bb06'
  },
  {
    _id: 'b99fc6a0-ad68-48bd-a64b-8cf0ffee79ad',
    title: "God's Pocket",
    genres: [
      'Personal Development',
      'Thriller',
      'Gothic',
      'Dystopian',
      'Mystery'
    ],
    publicationDate: '1/23/1976',
    publisher: 'Quire',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '339333419-0',
    language: 'Hiri Motu',
    pageCount: 561,
    price: 57.01,
    format: ['Hardcover', 'E-Book'],
    authorId: 'e3cd6df6-103e-4108-bc96-e0d39bd0713f'
  },
  {
    _id: '6b77352d-d818-4b27-8541-3dd247de4f3d',
    title: 'Knight of Cups',
    genres: ['Children’s', 'Bildungsroman', 'Humor'],
    publicationDate: '7/15/2014',
    publisher: 'Twinder',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '052531067-3',
    language: 'Catalan',
    pageCount: 389,
    price: 18.16,
    format: ['Hardcover', 'Paperback'],
    authorId: '3e877cfc-89d2-426f-9f9c-b369a04eb4c7'
  },
  {
    _id: '105bd1ee-86c3-45c9-a7f4-ba338bd59552',
    title: 'Valentine',
    genres: [
      'Thriller',
      'History',
      'Contemporary',
      'Cookbook',
      'Families & Relationships'
    ],
    publicationDate: '10/31/1934',
    publisher: 'Youbridge',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '600474990-7',
    language: 'Polish',
    pageCount: 220,
    price: 39.85,
    format: ['Hardcover', 'Paperback'],
    authorId: '27e677cd-e10c-47e5-b88b-df85aaddaf2a'
  },
  {
    _id: 'd9688808-d047-4100-b284-88647f7aa3fd',
    title: 'Portraits of Women (Naisenkuvia)',
    genres: ['Bildungsroman', 'Personal Development', 'History', 'Cookbook'],
    publicationDate: '11/15/1952',
    publisher: 'Yadel',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '076113498-0',
    language: 'Quechua',
    pageCount: 4,
    price: 46.37,
    format: ['E-Book', 'Hardcover'],
    authorId: 'c7297411-b3a3-4704-bcd8-48f097c65d5f'
  },
  {
    _id: '01fd608f-290f-4ffc-8b2f-9ff2820aa5a4',
    title: 'Dream House',
    genres: ['Children’s', 'Southern Gothic Fiction', 'Self-help', 'Horror'],
    publicationDate: '7/25/1954',
    publisher: 'Eadel',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '993268998-X',
    language: 'Kashmiri',
    pageCount: 370,
    price: 96.44,
    format: ['Paperback'],
    authorId: '4ecb2ba5-45ad-4d90-801f-cba7ba5fd095'
  },
  {
    _id: '7bb86a46-4ce8-433d-827c-07e6203fe36f',
    title: 'Joan of Paris',
    genres: ['Thriller', 'Families & Relationships', 'Fiction', 'Motivational'],
    publicationDate: '7/24/1964',
    publisher: 'Wordpedia',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '580254919-X',
    language: 'Northern Sotho',
    pageCount: 597,
    price: 6.07,
    format: ['Hardcover', 'E-Book'],
    authorId: 'd2198f3f-847e-413d-9775-c97e03a521d3'
  },
  {
    _id: 'd60ebca0-091f-48dc-8b0d-00b03a18dc7c',
    title: 'Kidulthood',
    genres: ['Horror', 'Fiction', 'Romance', 'Mystery'],
    publicationDate: '10/26/1994',
    publisher: 'Skyble',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '836196657-9',
    language: 'Korean',
    pageCount: 816,
    price: 81.44,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'f6464aff-3133-4ee2-872c-33a63df6b0a3'
  },
  {
    _id: '256aa91e-b8eb-4dc7-82af-f774df8c7fff',
    title: 'Grayeagle',
    genres: ['Families & Relationships', 'Historical fiction'],
    publicationDate: '12/12/1901',
    publisher: 'Realblab',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '693051452-7',
    language: 'Gagauz',
    pageCount: 803,
    price: 9.49,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '99721619-92e0-44ce-b189-6e09d5d15616'
  },
  {
    _id: '21badfcb-8bc2-4ac1-bdbc-7b51848948de',
    title: 'Abraham Lincoln',
    genres: ['Fiction', 'Gothic', 'Art', 'Guide / How-to', 'Paranormal'],
    publicationDate: '2/17/2003',
    publisher: 'Jaxbean',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '022748492-4',
    language: 'Kurdish',
    pageCount: 584,
    price: 6.85,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'cb503a3f-1b42-425c-bceb-93014711f259'
  },
  {
    _id: 'd29f81b9-0959-4294-af5a-2182dc2cc1c5',
    title: 'How to Succeed in Business Without Really Trying',
    genres: ['Memoir', 'Families & Relationships'],
    publicationDate: '4/20/1969',
    publisher: 'Livetube',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '305091194-8',
    language: 'Moldovan',
    pageCount: 22,
    price: 15.79,
    format: ['Paperback'],
    authorId: '170e2509-cc12-461b-997e-cae0e1e1fc79'
  },
  {
    _id: '8807d3d1-c148-4989-8298-fcffd9be14a6',
    title: 'Fire-Eater (Tulennielijä)',
    genres: ['Memoir', 'Gothic', 'Romance'],
    publicationDate: '1/9/1943',
    publisher: 'Riffpath',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '827138859-2',
    language: 'Catalan',
    pageCount: 203,
    price: 27.38,
    format: ['Paperback', 'E-Book'],
    authorId: '8db08c4b-7983-4518-9a33-bef0994d925d'
  },
  {
    _id: '6fb2816a-926c-4b0c-b8ee-21fbb60aadfd',
    title: 'Age of the Earth, The (A Idade da Terra)',
    genres: ['Dystopian', 'Science Fiction'],
    publicationDate: '1/29/1942',
    publisher: 'Vinte',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '114559246-5',
    language: 'West Frisian',
    pageCount: 751,
    price: 14.06,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'fa628853-a277-45ef-a75e-b22fd18b554d'
  },
  {
    _id: '5165359b-11fb-4400-9676-4f257be96edc',
    title:
      'Godzilla: Tokyo S.O.S. (Gojira tai Mosura tai Mekagojira: Tôkyô S.O.S.)',
    genres: ['Children’s', 'Art'],
    publicationDate: '5/28/1902',
    publisher: 'Devshare',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '041935927-3',
    language: 'Estonian',
    pageCount: 466,
    price: 38.08,
    format: ['Hardcover'],
    authorId: 'c8ae1dbe-60e4-424e-9263-bb03447f6bbf'
  },
  {
    _id: '3d07557e-17cc-47b3-afd5-950657d3c48e',
    title: 'Gone to Earth',
    genres: ['Adventure', 'Self-help', 'Historical fiction', 'Contemporary'],
    publicationDate: '10/13/1948',
    publisher: 'Blognation',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '250798735-9',
    language: 'Swati',
    pageCount: 427,
    price: 44.71,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '6b979044-6c52-4d95-944d-b0f08c724f1c'
  },
  {
    _id: '7600783b-14a3-47cb-9289-5ebcad04e033',
    title: 'Sweetest Thing, The',
    genres: ['Romance'],
    publicationDate: '9/25/1954',
    publisher: 'Oyondu',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '416104055-5',
    language: 'Tetum',
    pageCount: 964,
    price: 28.52,
    format: ['Hardcover', 'E-Book'],
    authorId: '409aff3e-d33d-447c-85f9-f05ee676dcda'
  },
  {
    _id: 'aad59f1c-0c70-46f8-ac71-0b397f711e01',
    title: 'Champagne',
    genres: ['Thriller'],
    publicationDate: '6/5/1908',
    publisher: 'Dynabox',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '303854645-3',
    language: 'Papiamento',
    pageCount: 604,
    price: 66.94,
    format: ['E-Book', 'Paperback'],
    authorId: '7cdbc5ad-12b8-428d-9ab8-57d117328403'
  },
  {
    _id: '821cb03a-955b-4e9a-8d4b-bef7c0c987f2',
    title: 'Me, Myself & Irene',
    genres: [
      'Southern Gothic Fiction',
      'Romance',
      'Motivational',
      'Historical fiction'
    ],
    publicationDate: '8/29/1909',
    publisher: 'Skibox',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '883898436-0',
    language: 'Thai',
    pageCount: 603,
    price: 83.73,
    format: ['Hardcover', 'Paperback'],
    authorId: '0c22558c-0ae9-43f4-ad7f-1ed7c3c39ee2'
  },
  {
    _id: '651dc87a-e239-4b24-8c56-87f15dd01c4f',
    title: 'Rabbit',
    genres: ['Fiction', 'Cookbook'],
    publicationDate: '9/18/1957',
    publisher: 'Lazzy',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '628939397-9',
    language: 'Hindi',
    pageCount: 148,
    price: 65.7,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '96d8604e-0e99-4bd1-bcc6-1a0800b317c2'
  },
  {
    _id: '3433b92d-84d7-4b76-8ba5-80eb0e8248a8',
    title: 'Escuela de seducción',
    genres: ['History', 'Children’s'],
    publicationDate: '1/27/1990',
    publisher: 'Minyx',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '130290061-7',
    language: 'Telugu',
    pageCount: 236,
    price: 5.76,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '31406a1a-f2f6-46bb-bd0c-f27304b73763'
  },
  {
    _id: '8a031d8a-4c8a-4377-baff-94b92d320c51',
    title: 'Sherlock Holmes',
    genres: ['Bildungsroman', 'Personal Development', 'Horror', 'Health'],
    publicationDate: '1/14/1920',
    publisher: 'Twitterbridge',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '322559176-9',
    language: 'West Frisian',
    pageCount: 634,
    price: 27.2,
    format: ['E-Book', 'Hardcover'],
    authorId: '54d3fa8d-fa45-451f-9f29-d5e35b8c80dd'
  },
  {
    _id: '3171202b-358f-4eb1-a552-615c7f88113c',
    title: 'Tokyo Drifter (Tôkyô nagaremono)',
    genres: [
      'Self-help',
      'History',
      'Romance',
      'Families & Relationships',
      'Travel'
    ],
    publicationDate: '12/20/1942',
    publisher: 'Cogilith',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '147303081-1',
    language: 'Portuguese',
    pageCount: 122,
    price: 1.19,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '140bb64f-c2ca-4250-97a7-7d5c395d1ea2'
  },
  {
    _id: '88526385-551a-4dcf-91c1-7097ee4fb894',
    title: 'Zarafa',
    genres: ['Contemporary'],
    publicationDate: '8/17/1986',
    publisher: 'Twitterworks',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '733531445-3',
    language: 'Tamil',
    pageCount: 770,
    price: 7.07,
    format: ['Hardcover'],
    authorId: 'f3159d8b-d89b-4741-a77f-ea80b0998491'
  },
  {
    _id: '7ce0601a-b820-4c26-b9d0-74faee75cb56',
    title: 'Keep Your Distance',
    genres: ['Travel', 'Adventure', 'Fiction', 'Self-help'],
    publicationDate: '9/11/2019',
    publisher: 'Wikivu',
    summary:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '251933302-2',
    language: 'Icelandic',
    pageCount: 810,
    price: 44.74,
    format: ['Paperback', 'Hardcover'],
    authorId: 'f44f7f78-2326-465b-8abe-9724da08ac22'
  },
  {
    _id: '254a77b0-f055-4dc1-b9fa-3b23d811c8be',
    title: 'Project X',
    genres: ['Fiction', 'Adventure', 'Paranormal'],
    publicationDate: '9/16/1990',
    publisher: 'Skilith',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '631932579-8',
    language: 'Irish Gaelic',
    pageCount: 521,
    price: 96.82,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '802d98db-0a9c-4539-8ad4-a6bc19385fb9'
  },
  {
    _id: '8beead67-2370-4099-ba30-44f0ed524065',
    title: "Gulliver's Travels",
    genres: ['Horror', 'Historical fiction'],
    publicationDate: '5/16/2018',
    publisher: 'Quaxo',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '053318210-7',
    language: 'Japanese',
    pageCount: 557,
    price: 84.93,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '8c9f39a6-2468-417d-9003-289fd8f5c5d0'
  },
  {
    _id: '623657cd-ba6e-4a0c-875c-b5d41ab65991',
    title: 'Star Wars: The Clone Wars',
    genres: ['Adventure', 'Bildungsroman'],
    publicationDate: '7/21/1955',
    publisher: 'Myworks',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '285272231-3',
    language: 'English',
    pageCount: 229,
    price: 89.32,
    format: ['Hardcover'],
    authorId: 'cb503a3f-1b42-425c-bceb-93014711f259'
  },
  {
    _id: '705d7e24-15e9-4495-8d8d-02257dbec002',
    title: 'Süperseks',
    genres: ['Travel', 'Romance', 'Cookbook', 'Self-help', 'Horror'],
    publicationDate: '10/26/2022',
    publisher: 'Twimbo',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '926694824-1',
    language: 'Portuguese',
    pageCount: 40,
    price: 35.55,
    format: ['Hardcover', 'Paperback'],
    authorId: '04e3a9e3-49dd-476b-a7f4-5f2c6f77b040'
  },
  {
    _id: '1443ee8f-29b6-4d13-bbd0-1cf466245ade',
    title: 'Romero',
    genres: ['Personal Development', 'Adventure', 'Southern Gothic Fiction'],
    publicationDate: '1/29/2014',
    publisher: 'Avaveo',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '205874356-3',
    language: 'Malagasy',
    pageCount: 259,
    price: 1.69,
    format: ['E-Book'],
    authorId: '21bed63e-3da5-47db-aae9-83e49472a445'
  },
  {
    _id: 'a0d5c70c-2133-4829-981a-48a9255da760',
    title: 'Enchantment',
    genres: [
      'Motivational',
      'Personal Development',
      'Historical fiction',
      'Science Fiction',
      'Travel'
    ],
    publicationDate: '7/4/1968',
    publisher: 'Skajo',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '125141319-6',
    language: 'Kurdish',
    pageCount: 40,
    price: 93.95,
    format: ['Hardcover'],
    authorId: '6072fb46-42e3-4c32-9cc5-d11d1531a642'
  },
  {
    _id: 'da380752-efb9-4598-8f8f-378c4311b312',
    title: 'Thirst',
    genres: [
      'Dystopian',
      'Self-help',
      'Historical fiction',
      'Horror',
      'Contemporary'
    ],
    publicationDate: '8/2/1963',
    publisher: 'Gigazoom',
    summary:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '465415128-1',
    language: 'English',
    pageCount: 930,
    price: 85.95,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'f2e866e9-1707-477b-8130-8185445120b9'
  },
  {
    _id: 'a5ecec5f-0097-4beb-a9bd-058a03faab7e',
    title: 'Fall of the Republic: The Presidency of Barack H. Obama',
    genres: [
      'Art',
      'Guide / How-to',
      'Motivational',
      'Historical fiction',
      'Contemporary'
    ],
    publicationDate: '11/23/1956',
    publisher: 'Teklist',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '156195784-4',
    language: 'New Zealand Sign Language',
    pageCount: 40,
    price: 1.63,
    format: ['E-Book', 'Hardcover'],
    authorId: '0a1d81a2-ab37-4940-8485-87b409caa8dc'
  },
  {
    _id: 'ec9775d4-10c0-46e8-aea6-cfca51071763',
    title: 'About Last Night',
    genres: ['Southern Gothic Fiction', 'Gothic', 'Art', 'Mystery', 'Travel'],
    publicationDate: '12/11/1914',
    publisher: 'Browsetype',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '679512494-0',
    language: 'Chinese',
    pageCount: 262,
    price: 4.27,
    format: ['Paperback'],
    authorId: 'ad923796-1ad6-4a1d-88b6-454a04412573'
  },
  {
    _id: '2e5e554c-dbc2-494c-827b-ed4cbb9e54e5',
    title: 'One Percent, The',
    genres: ['Travel', 'Paranormal', 'Mystery'],
    publicationDate: '1/3/1926',
    publisher: 'Bubbletube',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '376330064-3',
    language: 'Hindi',
    pageCount: 75,
    price: 60.61,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '9e447a26-aaaa-41e6-bb04-241b552dcbbc'
  },
  {
    _id: '28bc73e8-8c20-4f76-98b6-12a33c3ad821',
    title: 'Ed and His Dead Mother',
    genres: ['Dystopian'],
    publicationDate: '9/26/1947',
    publisher: 'Ozu',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '426135272-9',
    language: 'Greek',
    pageCount: 962,
    price: 12.13,
    format: ['E-Book', 'Paperback'],
    authorId: 'fc1068d1-310e-4fe3-8bb0-175e7010d66c'
  },
  {
    _id: 'b25fd534-7b3c-4a79-a416-98eb525315f7',
    title: "Solomon Northup's Odyssey",
    genres: [
      'Adventure',
      'Horror',
      'Contemporary',
      'Bildungsroman',
      'Science Fiction'
    ],
    publicationDate: '9/6/1923',
    publisher: 'Tazz',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '575507962-5',
    language: 'Swahili',
    pageCount: 264,
    price: 61.77,
    format: ['E-Book'],
    authorId: '51e0eb6e-7d43-4fd3-8f15-671bb4da1d05'
  },
  {
    _id: '21ed7160-27ec-486c-a64b-3601c0c96cfb',
    title: 'Passing Strange',
    genres: ['Horror'],
    publicationDate: '1/22/1919',
    publisher: 'Blogtag',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '519923623-7',
    language: 'Māori',
    pageCount: 67,
    price: 16.79,
    format: ['Paperback'],
    authorId: 'c6ba9f0c-e9e6-4190-a834-115f10349196'
  },
  {
    _id: '03f3f7d8-ccf1-4a2a-97eb-ae6e8aa876a1',
    title: 'Warrendale',
    genres: ['History', 'Personal Development'],
    publicationDate: '4/2/1930',
    publisher: 'Fatz',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '284909530-3',
    language: 'Tetum',
    pageCount: 701,
    price: 86.24,
    format: ['E-Book', 'Paperback'],
    authorId: '8603e557-730e-4ce0-8760-6fbcbbc45806'
  },
  {
    _id: '3eaf1246-bb49-4b58-bbdd-58bfd1ffd365',
    title: 'Very Harold & Kumar 3D Christmas, A',
    genres: ['Travel'],
    publicationDate: '6/21/2018',
    publisher: 'Eimbee',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '625808349-8',
    language: 'Icelandic',
    pageCount: 610,
    price: 78.89,
    format: ['Paperback', 'E-Book'],
    authorId: 'd2198f3f-847e-413d-9775-c97e03a521d3'
  },
  {
    _id: '0767b967-15d6-4c00-9e7d-c69a236e62b0',
    title: 'Fun on a Weekend',
    genres: ['Fiction', 'Health', 'Memoir', 'Cookbook', 'Dystopian'],
    publicationDate: '12/8/1959',
    publisher: 'Rhycero',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '130952361-4',
    language: 'Yiddish',
    pageCount: 410,
    price: 0.01,
    format: ['Hardcover'],
    authorId: 'f645d28a-670a-457a-b55f-a32876b8511d'
  },
  {
    _id: '98d3872c-67f2-4192-ab8e-e7686c58ced6',
    title: 'Cat Returns, The (Neko no ongaeshi)',
    genres: ['Self-help', 'Health', 'Memoir', 'Mystery', 'Travel'],
    publicationDate: '11/3/1926',
    publisher: 'Mynte',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '995366437-4',
    language: 'Dari',
    pageCount: 761,
    price: 78.73,
    format: ['Paperback', 'E-Book'],
    authorId: '68485131-aadd-4e22-a2b7-bd39977e2949'
  },
  {
    _id: '9b36bc9e-7fae-491e-abf1-0caeeea5cf52',
    title: 'Batman Returns',
    genres: ['Science Fiction', 'Contemporary', 'Memoir'],
    publicationDate: '8/2/1911',
    publisher: 'Cogilith',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '244704739-8',
    language: 'Khmer',
    pageCount: 489,
    price: 51.36,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'd900d786-8c6b-4397-baf9-2a63650e5b75'
  },
  {
    _id: '7dbfe3bc-1a39-4689-8fb5-bea44b637a3a',
    title: 'Muppet Christmas: Letters to Santa, A',
    genres: [
      'Motivational',
      'Science Fiction',
      'Mystery',
      'Self-help',
      'Fiction'
    ],
    publicationDate: '3/11/1933',
    publisher: 'Twimbo',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '878130915-5',
    language: 'Gagauz',
    pageCount: 213,
    price: 19.95,
    format: ['Paperback', 'E-Book'],
    authorId: '347ae575-3cf2-4081-8b31-4a3674288d38'
  },
  {
    _id: 'c540e08f-34c3-4017-9c2c-c342c87a9cb4',
    title: 'Cosmonaut, The',
    genres: ['Art'],
    publicationDate: '2/29/1908',
    publisher: 'Quinu',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '567591255-X',
    language: 'Montenegrin',
    pageCount: 375,
    price: 48.09,
    format: ['E-Book'],
    authorId: '54d3fa8d-fa45-451f-9f29-d5e35b8c80dd'
  },
  {
    _id: '91b1e81b-5191-433b-959e-5aa10f1ee626',
    title: 'L: Change the World',
    genres: ['Mystery', 'Self-help'],
    publicationDate: '9/27/2019',
    publisher: 'Devpulse',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '189960841-9',
    language: 'Moldovan',
    pageCount: 222,
    price: 4.54,
    format: ['E-Book', 'Paperback'],
    authorId: 'eea94c31-9e82-4c6a-949f-77aedca936e0'
  },
  {
    _id: '8ac66f3d-1f75-46e5-bd9d-c0e2a3078f50',
    title: 'Bye Bye Braverman',
    genres: [
      'Personal Development',
      'Romance',
      'Adventure',
      'Dystopian',
      'Southern Gothic Fiction'
    ],
    publicationDate: '1/29/1969',
    publisher: 'Youbridge',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '161622586-6',
    language: 'Malay',
    pageCount: 325,
    price: 85.41,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'b2b96c9b-402b-4256-8542-d966f242e9c6'
  },
  {
    _id: 'ec34cbcf-ccd2-4902-864e-8d68f3647e01',
    title: 'Bleak Moments',
    genres: ['Contemporary', 'Adventure', 'Southern Gothic Fiction'],
    publicationDate: '9/17/2004',
    publisher: 'Eabox',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '727095524-7',
    language: 'Macedonian',
    pageCount: 81,
    price: 91.8,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '32666108-ded7-46e9-abef-7e1c58204177'
  },
  {
    _id: '51d2a5d1-ea91-4449-a292-053ef6c76240',
    title: 'Strangers When We Meet',
    genres: [
      'Southern Gothic Fiction',
      'Science Fiction',
      'Personal Development',
      'Motivational'
    ],
    publicationDate: '5/8/1990',
    publisher: 'Feedfire',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '593085657-5',
    language: 'Khmer',
    pageCount: 977,
    price: 41.9,
    format: ['E-Book', 'Hardcover'],
    authorId: '4825d81f-42c5-4bee-810b-4ae6f917067e'
  },
  {
    _id: 'c7d6360d-63e7-4e00-90b0-985b50a709aa',
    title: 'Ladies of Leisure',
    genres: ['Guide / How-to', 'Personal Development', 'Gothic', 'Horror'],
    publicationDate: '12/6/1938',
    publisher: 'Wikivu',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '040906232-4',
    language: 'Korean',
    pageCount: 393,
    price: 40.64,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '51e0eb6e-7d43-4fd3-8f15-671bb4da1d05'
  },
  {
    _id: '333014a8-c20b-41fe-82b0-45574990bdf4',
    title: 'I Want to Look Like That Guy',
    genres: ['Fiction', 'Thriller', 'Paranormal', 'Mystery'],
    publicationDate: '5/8/1954',
    publisher: 'Meejo',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '219765158-7',
    language: 'Norwegian',
    pageCount: 745,
    price: 6.52,
    format: ['Hardcover'],
    authorId: 'fd909907-9c4f-4223-ad04-0fb5a187f30c'
  },
  {
    _id: '0c2a1464-6b68-4796-9f78-6209d0fccc00',
    title: 'Richard III',
    genres: ['Self-help', 'Cookbook'],
    publicationDate: '12/21/1984',
    publisher: 'Avamm',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '749966021-4',
    language: 'Tok Pisin',
    pageCount: 719,
    price: 86.41,
    format: ['E-Book'],
    authorId: 'f88250fb-7c0c-434d-bf18-4b83e7452c60'
  },
  {
    _id: '8b50a27c-53fb-4eab-8478-51132f63555f',
    title: '.45',
    genres: ['Health', 'Children’s', 'Southern Gothic Fiction'],
    publicationDate: '1/2/1902',
    publisher: 'Zoomcast',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '026558905-3',
    language: 'Armenian',
    pageCount: 949,
    price: 54.55,
    format: ['Paperback'],
    authorId: '873497f1-d973-4516-9da1-18bc913c26a0'
  },
  {
    _id: '6d79b7b4-e852-425c-9dc9-a17a793fac33',
    title: 'Deception',
    genres: ['Adventure', 'Cookbook', 'Personal Development', 'Fiction'],
    publicationDate: '2/5/1902',
    publisher: 'Browsedrive',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '663615140-4',
    language: 'Luxembourgish',
    pageCount: 254,
    price: 30.14,
    format: ['Paperback', 'Hardcover'],
    authorId: 'f3e25d49-92b1-46eb-b084-4d43a01bad23'
  },
  {
    _id: '903dc47e-0f99-4b45-ab8c-5f4cbcdbeac0',
    title: 'Point, The',
    genres: ['Contemporary', 'Personal Development', 'Humor', 'Cookbook'],
    publicationDate: '1/28/1967',
    publisher: 'Yotz',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '624283748-X',
    language: 'Latvian',
    pageCount: 781,
    price: 26,
    format: ['E-Book'],
    authorId: '1481d077-38f4-4d90-8836-636d05dcdbef'
  },
  {
    _id: '1c671850-86fc-463e-9724-d9b95e7c5121',
    title: 'Zorro',
    genres: ['Mystery', 'Motivational', 'History', 'Contemporary'],
    publicationDate: '2/22/1968',
    publisher: 'Skyndu',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '007767219-4',
    language: 'Catalan',
    pageCount: 976,
    price: 90.65,
    format: ['Hardcover'],
    authorId: 'e9a62bce-c1ba-4664-8721-5f90a8640685'
  },
  {
    _id: 'a83d96f7-e9de-4359-a120-c8f14098f474',
    title: 'Scientist, The',
    genres: ['Gothic'],
    publicationDate: '2/15/1975',
    publisher: 'Avavee',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '567478516-3',
    language: 'Dzongkha',
    pageCount: 282,
    price: 31.31,
    format: ['Hardcover', 'Paperback'],
    authorId: '8615dc19-f563-41ea-a37d-f4ddf988f463'
  },
  {
    _id: '3fa1b437-4978-44fe-b382-8c8d3ea6d310',
    title: 'Private Eyes, The',
    genres: [
      'Fiction',
      'History',
      'Romance',
      'Southern Gothic Fiction',
      'Thriller'
    ],
    publicationDate: '9/9/2001',
    publisher: 'Topdrive',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '019751417-0',
    language: 'Dhivehi',
    pageCount: 924,
    price: 93.91,
    format: ['Paperback'],
    authorId: '3d5cddce-4406-4073-9164-07910750ab76'
  },
  {
    _id: '477525f2-755f-4537-ac43-70d0fcdcedc8',
    title: 'Winner, The',
    genres: ['Historical fiction'],
    publicationDate: '3/17/1967',
    publisher: 'Lazzy',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '077290013-2',
    language: 'Dutch',
    pageCount: 256,
    price: 82.89,
    format: ['E-Book'],
    authorId: '0f48831d-a1bd-49b2-aecd-22d780a4dc67'
  },
  {
    _id: '8ea3e55b-5687-4565-8381-428b8aa12853',
    title: 'Girl, Positive',
    genres: ['Cookbook', 'Guide / How-to', 'Humor', 'Motivational'],
    publicationDate: '10/11/1908',
    publisher: 'Zoovu',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '154965972-3',
    language: 'Khmer',
    pageCount: 895,
    price: 24.52,
    format: ['Paperback', 'E-Book'],
    authorId: '83ce2367-949a-41ad-956b-5640a290c63a'
  },
  {
    _id: 'fd202505-c03f-4ad1-93c4-45baf476d7d9',
    title: 'Hamlet 2',
    genres: ['Children’s', 'Mystery', 'Southern Gothic Fiction', 'Paranormal'],
    publicationDate: '10/8/1951',
    publisher: 'Zoomcast',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '304756356-X',
    language: 'Korean',
    pageCount: 48,
    price: 0.24,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'cd241b6d-6c8b-4827-b2bd-979f238e8e5d'
  },
  {
    _id: 'fc699023-564c-47fd-b6ca-1facf7a39a33',
    title: "Making 'Do the Right Thing'",
    genres: ['History', 'Humor', 'Children’s'],
    publicationDate: '5/12/1911',
    publisher: 'Gigaclub',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '955126749-4',
    language: 'Malay',
    pageCount: 18,
    price: 17.47,
    format: ['Paperback', 'E-Book'],
    authorId: 'd7e14c9d-4648-4797-bc75-99c29f5bebe3'
  },
  {
    _id: '8cab6854-9c95-453f-bfcf-2a8a89760821',
    title: 'Terror Beneath the Sea, The (Kaitei daisensô)',
    genres: ['Travel', 'Fiction', 'Motivational', 'Humor', 'Dystopian'],
    publicationDate: '10/12/1909',
    publisher: 'Photojam',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '814038193-4',
    language: 'Dutch',
    pageCount: 177,
    price: 9.6,
    format: ['E-Book'],
    authorId: '347ae575-3cf2-4081-8b31-4a3674288d38'
  },
  {
    _id: 'a82cc4d3-2f9f-4684-9ed4-02175d2b7871',
    title: 'Maidens in Uniform (Mädchen in Uniform)',
    genres: ['Memoir', 'Bildungsroman', 'Humor', 'Thriller'],
    publicationDate: '10/9/1958',
    publisher: 'Lajo',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '688220583-3',
    language: 'Gujarati',
    pageCount: 40,
    price: 72.05,
    format: ['Hardcover', 'Paperback'],
    authorId: 'b9565135-e7ff-46b6-a864-df9a80f289cf'
  },
  {
    _id: 'f8c50165-b893-4f03-9fac-22244ed3f332',
    title: 'Sherlock Holmes',
    genres: ['Gothic', 'Adventure', 'Travel'],
    publicationDate: '7/25/1984',
    publisher: 'Centimia',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '993670792-3',
    language: 'Yiddish',
    pageCount: 14,
    price: 19.51,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '0b03307a-f793-4582-8d86-aac321101db3'
  },
  {
    _id: 'c7a8512b-548b-4196-9b78-33445769e247',
    title: 'See You Tomorrow, Everyone',
    genres: ['Bildungsroman', 'Humor', 'Southern Gothic Fiction', 'Paranormal'],
    publicationDate: '1/4/1929',
    publisher: 'Quatz',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '415398607-0',
    language: 'Tswana',
    pageCount: 456,
    price: 27.44,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'a1c3fc06-4b6c-42f9-9059-41273a7ba4f2'
  },
  {
    _id: '8f11a24a-c0d9-4974-998f-3c8394ebf2ca',
    title: 'Alien Predator (Mutant II) (Falling, The)',
    genres: ['Fiction', 'Cookbook'],
    publicationDate: '11/15/2011',
    publisher: 'Topicshots',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '088819790-X',
    language: 'Hebrew',
    pageCount: 330,
    price: 79.76,
    format: ['Hardcover', 'E-Book'],
    authorId: '882035d5-5704-4d83-8268-013f14bbbb35'
  },
  {
    _id: '1aa1eaa7-cd04-4eed-8462-4d7a47921908',
    title: 'Herbie Rides Again',
    genres: ['Thriller'],
    publicationDate: '2/11/1920',
    publisher: 'Skalith',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '597518755-9',
    language: 'Hebrew',
    pageCount: 150,
    price: 92.85,
    format: ['E-Book', 'Paperback'],
    authorId: '0c6bb74d-5ba1-401f-a80a-373d09e8db8d'
  },
  {
    _id: '538c43b2-7cca-42ef-9838-a00f650a85bf',
    title: 'Second Best',
    genres: [
      'Bildungsroman',
      'Travel',
      'Children’s',
      'Mystery',
      'Historical fiction'
    ],
    publicationDate: '11/28/1929',
    publisher: 'Kanoodle',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '232627094-0',
    language: 'Armenian',
    pageCount: 44,
    price: 40.11,
    format: ['Hardcover'],
    authorId: 'da78d931-1396-40a5-b042-5a20ad83c80e'
  },
  {
    _id: 'e8685ed3-2da0-43d4-ae93-22d1422fd303',
    title: 'Quest, The',
    genres: [
      'Self-help',
      'Families & Relationships',
      'Cookbook',
      'Historical fiction',
      'Paranormal'
    ],
    publicationDate: '11/8/1915',
    publisher: 'Flashpoint',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '697590101-5',
    language: 'Northern Sotho',
    pageCount: 300,
    price: 39.75,
    format: ['E-Book', 'Paperback'],
    authorId: 'ba651cf2-8c94-459f-96f6-6a44aa62eb6f'
  },
  {
    _id: '39d45a5c-2b96-4c3b-8c2a-2a08fa6f2b76',
    title: 'Fubar II (Fubar: Balls to the Wall)',
    genres: ['Children’s', 'Families & Relationships'],
    publicationDate: '12/9/1991',
    publisher: 'Lazz',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '475008064-0',
    language: 'Tajik',
    pageCount: 924,
    price: 20.07,
    format: ['Paperback'],
    authorId: 'bb47464b-4413-468d-94f2-695d6850d825'
  },
  {
    _id: 'dfa082b7-b5ca-4e8c-b2c7-612f04156441',
    title: 'Shadows (Senki)',
    genres: [
      'Cookbook',
      'Personal Development',
      'Motivational',
      'Memoir',
      'Families & Relationships'
    ],
    publicationDate: '1/17/1920',
    publisher: 'Zoomdog',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '561530302-6',
    language: 'Moldovan',
    pageCount: 806,
    price: 51.14,
    format: ['Hardcover'],
    authorId: '8baedb8e-4a69-4f01-82b3-0b4374d74ad4'
  },
  {
    _id: '0155481d-6b3f-4395-a062-c43a4bad9fa6',
    title: '4:44 Last Day on Earth',
    genres: ['Health', 'Families & Relationships', 'Art'],
    publicationDate: '2/19/1968',
    publisher: 'Photospace',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '856283998-1',
    language: 'Guaraní',
    pageCount: 918,
    price: 24.33,
    format: ['E-Book', 'Paperback'],
    authorId: 'ba0095b7-6e65-43cd-939a-4d60d76c10df'
  },
  {
    _id: '0c273419-0adc-479b-be9e-9b74f312a0bc',
    title: "Ain't in It for My Health: A Film About Levon Helm",
    genres: ['Historical fiction'],
    publicationDate: '9/22/1983',
    publisher: 'Linklinks',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '075777834-8',
    language: 'Kyrgyz',
    pageCount: 840,
    price: 1.98,
    format: ['Hardcover', 'E-Book'],
    authorId: '833ffd7f-ba4c-42bb-8671-1f38985707e3'
  },
  {
    _id: 'e0679801-81d3-40d8-9388-5c3e8a01c80a',
    title: 'They Live by Night',
    genres: ['Horror'],
    publicationDate: '7/26/1950',
    publisher: 'Linkbuzz',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '027378159-6',
    language: 'Kannada',
    pageCount: 332,
    price: 74.23,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'c6b583b0-8011-496d-a23b-8d6e62d43a38'
  },
  {
    _id: '9fdc23b8-77e9-4e99-a80d-05d03325081d',
    title: 'Remember the Night',
    genres: ['Art', 'Thriller', 'Memoir', 'Self-help'],
    publicationDate: '9/4/1904',
    publisher: 'Yadel',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '041013218-7',
    language: 'Hindi',
    pageCount: 939,
    price: 72.94,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '6a072217-4ef7-4c73-9117-7a51f0cae605'
  },
  {
    _id: 'c8d092d0-2fe7-492c-9124-51dcc0b3c96b',
    title: 'Batman Beyond: Return of the Joker',
    genres: ['Thriller'],
    publicationDate: '3/24/2006',
    publisher: 'Geba',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '575043836-8',
    language: 'Hindi',
    pageCount: 219,
    price: 86.21,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'c9dd26e0-d10a-41fe-b54e-1f50cc288915'
  },
  {
    _id: '2157fa34-6f10-497f-84ff-48fa74c3ea5a',
    title:
      'Sergeant Körmy and the Underwater Vehicles (Vääpeli Körmy ja vetenalaiset vehkeet)',
    genres: [
      'Historical fiction',
      'Humor',
      'Adventure',
      'Horror',
      'Families & Relationships'
    ],
    publicationDate: '7/5/2017',
    publisher: 'Innotype',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '789664687-0',
    language: 'Persian',
    pageCount: 229,
    price: 38.98,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '145e6abe-f17b-477a-b5d6-9468c69df8b4'
  },
  {
    _id: '636bcc81-193e-49c3-bfdf-309618d03c26',
    title: 'Burning Secret',
    genres: ['Bildungsroman', 'Cookbook', 'Mystery'],
    publicationDate: '9/5/2011',
    publisher: 'Centidel',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '354102109-8',
    language: 'German',
    pageCount: 129,
    price: 0.49,
    format: ['Hardcover'],
    authorId: '27e677cd-e10c-47e5-b88b-df85aaddaf2a'
  },
  {
    _id: '415c874c-1472-4551-a1c0-6f3d88f353c7',
    title: 'Dukes, The',
    genres: ['Historical fiction'],
    publicationDate: '11/8/2016',
    publisher: 'Twitterbeat',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '106275629-0',
    language: 'Tetum',
    pageCount: 658,
    price: 92.15,
    format: ['Hardcover', 'Paperback'],
    authorId: '33954968-0cf9-49c3-920a-139cc8c5e497'
  },
  {
    _id: '48a48780-b0f9-4ec1-9623-0fa35a133a10',
    title: 'Miss Representation',
    genres: ['Horror', 'Travel'],
    publicationDate: '11/12/1901',
    publisher: 'Tagpad',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '474154307-2',
    language: 'Kazakh',
    pageCount: 297,
    price: 38.51,
    format: ['Hardcover'],
    authorId: '905af35b-2748-4028-8b91-09185eec7e29'
  },
  {
    _id: '7934c26f-b033-4f28-ab49-e6c014203305',
    title: "In the Edges: The 'Grizzly Man' Session ",
    genres: ['Travel', 'Families & Relationships'],
    publicationDate: '10/1/2002',
    publisher: 'Shufflester',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '976868646-4',
    language: 'Italian',
    pageCount: 608,
    price: 42.97,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '0547b9ff-4a01-465d-ba37-3be4cd542aea'
  },
  {
    _id: 'dcbbd813-8b00-4c97-ac33-146925a05a9c',
    title: 'Cage aux Folles, La',
    genres: ['Bildungsroman', 'Adventure'],
    publicationDate: '6/16/1944',
    publisher: 'Jetwire',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '384515137-4',
    language: 'Filipino',
    pageCount: 312,
    price: 13.83,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '170e2509-cc12-461b-997e-cae0e1e1fc79'
  },
  {
    _id: '461c9b76-db9c-45a3-b9e9-59e445dfb7f0',
    title: 'Human Nature',
    genres: ['Humor', 'Children’s', 'Gothic'],
    publicationDate: '8/17/1970',
    publisher: 'Meetz',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '625614271-3',
    language: 'Fijian',
    pageCount: 791,
    price: 87.76,
    format: ['E-Book', 'Paperback'],
    authorId: 'f3941bf0-a92b-4f5f-b14b-0c4e81c3465b'
  },
  {
    _id: '9ea79382-9cc5-4c81-b499-5217afd345f7',
    title: 'Going Postal',
    genres: ['Memoir'],
    publicationDate: '7/18/1915',
    publisher: 'Twimbo',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '873787927-8',
    language: 'Czech',
    pageCount: 690,
    price: 78.67,
    format: ['Paperback', 'E-Book'],
    authorId: 'f64a7965-962f-4085-a8f2-ff735c695fa1'
  },
  {
    _id: '424f10ec-7e52-4f2c-9270-884b89eca495',
    title: 'Uninvited Guest',
    genres: ['Mystery', 'Adventure', 'Historical fiction', 'Thriller'],
    publicationDate: '7/17/1949',
    publisher: 'Roomm',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '511979608-7',
    language: 'Khmer',
    pageCount: 735,
    price: 33.7,
    format: ['E-Book', 'Hardcover'],
    authorId: '9ab6487c-31f9-4b8f-8010-b6104fff041b'
  },
  {
    _id: 'b863ba2a-5494-4bac-8e76-80869ac61f37',
    title: 'All These Women (För att inte tala om alla dessa kvinnor)',
    genres: ['Romance', 'Paranormal', 'Children’s', 'Humor'],
    publicationDate: '1/29/1955',
    publisher: 'Gabspot',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '746413078-2',
    language: 'Norwegian',
    pageCount: 362,
    price: 86.25,
    format: ['Paperback', 'Hardcover'],
    authorId: 'af68a026-f040-4770-9c99-75dd45d64ca1'
  },
  {
    _id: '323837d7-88db-4056-a573-5808538e9d2d',
    title: 'Paradise: Love',
    genres: ['Travel'],
    publicationDate: '10/28/1988',
    publisher: 'Lazz',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '600774020-X',
    language: 'Burmese',
    pageCount: 839,
    price: 74.29,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '64404e92-0886-4e7a-9fbf-d7c3e66c8c01'
  },
  {
    _id: 'e9bb75f8-e2e4-45ef-a2bf-afa60bff371b',
    title:
      'Last Circus, The (Balada triste de trompeta) (Sad Trumpet Ballad, A)',
    genres: ['Fiction'],
    publicationDate: '5/8/1970',
    publisher: 'Skyba',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '534247996-7',
    language: 'Filipino',
    pageCount: 499,
    price: 90.76,
    format: ['Hardcover'],
    authorId: 'e1513adf-4de2-445e-88d6-84e7ec8d90bd'
  },
  {
    _id: '19125406-3693-41f1-bb3a-6c16167a7ed3',
    title: 'Ju-on: The Grudge 2',
    genres: ['Self-help', 'History', 'Contemporary', 'Romance'],
    publicationDate: '6/14/2001',
    publisher: 'Thoughtstorm',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '756244269-X',
    language: 'Somali',
    pageCount: 898,
    price: 78.09,
    format: ['E-Book'],
    authorId: '04732e53-8b91-471f-a402-b3e767da8790'
  },
  {
    _id: '36e19920-482c-4bfe-98f5-1c4bfc5561ed',
    title: 'Boxcar Bertha',
    genres: ['Paranormal'],
    publicationDate: '6/9/1954',
    publisher: 'Fivebridge',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '926869627-4',
    language: 'Romanian',
    pageCount: 562,
    price: 97.48,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '64eb6b8c-309a-4b79-947f-d1e58a4a5a69'
  },
  {
    _id: '1cd7d98c-cb0b-402c-8f31-1867302ece81',
    title: 'Zabriskie Point',
    genres: ['Adventure', 'Motivational', 'Science Fiction', 'Fiction'],
    publicationDate: '7/3/1901',
    publisher: 'Yata',
    summary: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '890754741-6',
    language: 'Mongolian',
    pageCount: 953,
    price: 0.43,
    format: ['Hardcover'],
    authorId: 'bb34a679-7dca-4eb9-8848-b85df166c4a0'
  },
  {
    _id: 'b7a39969-9774-494d-b58f-faaaffd3b7fc',
    title: 'Dana Carvey: Squatting Monkeys Tell No Lies',
    genres: ['Humor', 'Art'],
    publicationDate: '7/7/1936',
    publisher: 'Reallinks',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '592746204-9',
    language: 'Lithuanian',
    pageCount: 97,
    price: 83.64,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'ba0095b7-6e65-43cd-939a-4d60d76c10df'
  },
  {
    _id: '84c88e5c-38aa-4a7c-9fc5-94c2965f839d',
    title: 'Bachelor Apartment',
    genres: ['Gothic'],
    publicationDate: '12/7/1943',
    publisher: 'Yamia',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '541326015-6',
    language: 'Gagauz',
    pageCount: 245,
    price: 54.07,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'cdf048ac-6874-45e9-8a93-2f561c22ed4e'
  },
  {
    _id: '4a8e8235-2bd4-4d38-938c-e05dc29b84f8',
    title: 'Stolen Seas',
    genres: ['History', 'Travel', 'Children’s', 'Fiction'],
    publicationDate: '1/9/1936',
    publisher: 'Aimbu',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '567868445-0',
    language: 'Malayalam',
    pageCount: 35,
    price: 24.45,
    format: ['Paperback'],
    authorId: '51ed9aae-7fa8-4e76-b9fa-79d41b185188'
  },
  {
    _id: '26800f40-f664-4492-8694-fbf3516e2584',
    title: "The Cat's Out",
    genres: ['Science Fiction', 'Guide / How-to', 'Bildungsroman', 'Mystery'],
    publicationDate: '10/15/1976',
    publisher: 'Jaxbean',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '288629330-X',
    language: 'Norwegian',
    pageCount: 848,
    price: 79.59,
    format: ['Hardcover', 'Paperback'],
    authorId: '81c74c34-9bc4-4f0e-bd73-6138cf29b38d'
  },
  {
    _id: '14a5ba9c-dd8c-4002-9a0a-68269f53100d',
    title: 'Ballad of Little Jo, The',
    genres: [
      'Health',
      'Contemporary',
      'Travel',
      'Historical fiction',
      'Paranormal'
    ],
    publicationDate: '2/14/1926',
    publisher: 'Quatz',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '476020986-7',
    language: 'Luxembourgish',
    pageCount: 560,
    price: 81.58,
    format: ['E-Book', 'Paperback'],
    authorId: 'fd909907-9c4f-4223-ad04-0fb5a187f30c'
  },
  {
    _id: '9ea273bd-41c0-4232-8788-308482fb78ce',
    title: 'Whale, The',
    genres: [
      'Romance',
      'Southern Gothic Fiction',
      'Families & Relationships',
      'Contemporary'
    ],
    publicationDate: '8/13/1949',
    publisher: 'Thoughtblab',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '423237612-7',
    language: 'Marathi',
    pageCount: 309,
    price: 94.88,
    format: ['E-Book', 'Paperback'],
    authorId: '6dd60757-b807-4923-996a-6b493bc20b4e'
  },
  {
    _id: '6d2a8429-50bb-419b-88ef-e143081e6ee4',
    title: 'Born to Win',
    genres: ['Families & Relationships'],
    publicationDate: '1/16/1903',
    publisher: 'Buzzster',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '306505391-8',
    language: 'Dzongkha',
    pageCount: 138,
    price: 14.51,
    format: ['Hardcover'],
    authorId: '95fddc41-c713-405d-997c-16afcc612de5'
  },
  {
    _id: 'd1ac7c2f-94e3-4ddf-bb10-c9edcc352db1',
    title: 'Stop! Or My Mom Will Shoot',
    genres: ['Contemporary', 'Personal Development'],
    publicationDate: '12/22/2009',
    publisher: 'Rhynyx',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '748078090-7',
    language: 'Mongolian',
    pageCount: 458,
    price: 97.36,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'fc6c44ff-62cc-4019-8816-00eff3686d31'
  },
  {
    _id: 'ad909b9a-4557-421d-98af-53c01d1bc660',
    title: 'On Guard (Bossu, Le)',
    genres: ['Dystopian', 'Motivational', 'Personal Development'],
    publicationDate: '10/22/1937',
    publisher: 'Muxo',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '277292687-7',
    language: 'Lithuanian',
    pageCount: 458,
    price: 24.83,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '935e284a-3232-49e2-a619-a4ebcff82601'
  },
  {
    _id: '8dddc2e1-7802-4942-ad6a-f2b1e2aceb44',
    title: 'Elevator Girl',
    genres: ['Thriller', 'Horror', 'Contemporary'],
    publicationDate: '5/6/1915',
    publisher: 'Thoughtworks',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '862127161-3',
    language: 'Tetum',
    pageCount: 483,
    price: 73.12,
    format: ['Hardcover', 'E-Book'],
    authorId: '828b565e-3494-4d6b-b49c-57fd26fd7c06'
  },
  {
    _id: 'e434751e-20cf-402c-b5bc-69f82f35518e',
    title: 'Polytechnique',
    genres: ['Families & Relationships', 'Horror', 'Cookbook', 'Dystopian'],
    publicationDate: '4/9/1929',
    publisher: 'Rhynyx',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '516027765-X',
    language: 'Kyrgyz',
    pageCount: 408,
    price: 45.19,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'f64a7965-962f-4085-a8f2-ff735c695fa1'
  },
  {
    _id: 'cbcc560e-cbdc-48f0-829b-ef11fa50ba40',
    title: 'Good Thief, The',
    genres: ['Art'],
    publicationDate: '2/3/2020',
    publisher: 'Babbleopia',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '100647944-9',
    language: 'Filipino',
    pageCount: 729,
    price: 63.47,
    format: ['E-Book'],
    authorId: '1481d077-38f4-4d90-8836-636d05dcdbef'
  },
  {
    _id: 'a9ba7156-8879-4d5f-9205-57da11c0e965',
    title: 'Meeting Evil',
    genres: ['Bildungsroman', 'Historical fiction', 'Paranormal', 'Art'],
    publicationDate: '1/22/1915',
    publisher: 'Tanoodle',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '787355064-8',
    language: 'Quechua',
    pageCount: 429,
    price: 10.73,
    format: ['E-Book'],
    authorId: '9429d241-0840-43d1-9e30-c4e2597759a6'
  },
  {
    _id: '5a7065ee-876f-433c-9344-2b32f4b4b672',
    title: '21 Up',
    genres: [
      'Dystopian',
      'Adventure',
      'Historical fiction',
      'Cookbook',
      'Mystery'
    ],
    publicationDate: '6/24/1980',
    publisher: 'Cogidoo',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '655901534-3',
    language: 'Tajik',
    pageCount: 986,
    price: 97.37,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'de2ce351-11a6-4425-92d6-e51a7f546a7b'
  },
  {
    _id: '9a8d5d1d-09db-4ec3-aaa0-7a8605fecfe3',
    title: 'Night of the Hunted, The (Nuit des traquées, La)',
    genres: [
      'Guide / How-to',
      'Personal Development',
      'Historical fiction',
      'Paranormal'
    ],
    publicationDate: '3/14/1970',
    publisher: 'Topicblab',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '971124595-7',
    language: 'Korean',
    pageCount: 577,
    price: 60,
    format: ['Hardcover'],
    authorId: 'e258bb2e-5ac3-42d8-8a56-76b681dff893'
  },
  {
    _id: '90b8e7cf-2393-444d-b8fb-e1f8656a53df',
    title: 'Battery, The',
    genres: ['Mystery', 'Gothic'],
    publicationDate: '12/24/1944',
    publisher: 'Ntags',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '363789556-0',
    language: 'Nepali',
    pageCount: 731,
    price: 57.85,
    format: ['Paperback', 'Hardcover'],
    authorId: 'e09b5a4c-0f84-427d-9353-863a2969a0d2'
  },
  {
    _id: 'f1b61e11-0018-47b3-91bf-e9fdd156abf7',
    title: 'Whatever Happened to Harold Smith?',
    genres: ['Personal Development', 'Humor', 'Bildungsroman', 'Thriller'],
    publicationDate: '5/8/1999',
    publisher: 'Tagpad',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '200386309-5',
    language: 'Japanese',
    pageCount: 313,
    price: 57.9,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'af50a070-5770-4f47-ac6c-e0fa0efd90ab'
  },
  {
    _id: 'fc609fc6-1503-47dc-8f27-0e55c2226e8c',
    title: 'Anywhere But Here',
    genres: ['Bildungsroman', 'Gothic'],
    publicationDate: '6/23/1931',
    publisher: 'Babbleopia',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '698990501-8',
    language: 'Portuguese',
    pageCount: 702,
    price: 48.81,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'def768fc-5cdb-4222-acb5-b14ce8f4083f'
  },
  {
    _id: 'ee3026b6-0cf3-4260-a2dc-5c1981fb039f',
    title: 'Kiss Them for Me',
    genres: ['Mystery', 'Dystopian', 'Memoir'],
    publicationDate: '8/28/1934',
    publisher: 'Thoughtworks',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '033115464-1',
    language: 'Irish Gaelic',
    pageCount: 995,
    price: 66.98,
    format: ['Paperback'],
    authorId: 'b9adbf2f-9a5f-4e66-bbbc-c46fde950257'
  },
  {
    _id: 'a300d2a5-24b1-4494-9aae-8bf170503ae4',
    title: 'Way of the Gun, The',
    genres: ['Fiction', 'Children’s', 'Science Fiction', 'Self-help'],
    publicationDate: '8/1/1936',
    publisher: 'Feedspan',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '535111765-7',
    language: 'Somali',
    pageCount: 870,
    price: 69.98,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '1de13141-3f8c-45be-ba28-ca1eee2aea37'
  },
  {
    _id: 'df4dc3f8-a6ae-448e-a469-ac2b488b921c',
    title: 'Awfully Big Adventure, An',
    genres: ['Motivational', 'Cookbook'],
    publicationDate: '3/12/1904',
    publisher: 'Innotype',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '161784164-1',
    language: 'Chinese',
    pageCount: 59,
    price: 0.97,
    format: ['E-Book'],
    authorId: '569d368d-46ef-43d9-aada-b17e655a509f'
  },
  {
    _id: '3740b1b0-ccca-4dd8-9278-43905b0022d4',
    title: 'Beijing Bicycle (Shiqi sui de dan che)',
    genres: ['Gothic', 'Personal Development'],
    publicationDate: '5/14/1933',
    publisher: 'Avamba',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '091359673-6',
    language: 'West Frisian',
    pageCount: 79,
    price: 50.73,
    format: ['E-Book'],
    authorId: 'a122a3ba-36c2-48d1-9014-83cd41e17953'
  },
  {
    _id: '6afaac83-915a-442c-9850-876a5c1e870c',
    title: 'Figures in a Landscape',
    genres: ['Horror'],
    publicationDate: '11/22/2014',
    publisher: 'Vipe',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '701293185-X',
    language: 'Swedish',
    pageCount: 188,
    price: 64.93,
    format: ['Hardcover', 'Paperback'],
    authorId: 'dbdd46ff-8370-4f50-bf25-64905df6ce18'
  },
  {
    _id: '24ad22d8-110e-4546-9197-41e6573b282b',
    title: "Gold of Rome (L'oro di Roma)",
    genres: ['Travel', 'Gothic', 'History', 'Paranormal', 'Guide / How-to'],
    publicationDate: '6/6/2012',
    publisher: 'Gigazoom',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '235467754-5',
    language: 'Romanian',
    pageCount: 565,
    price: 74.51,
    format: ['E-Book'],
    authorId: 'b9a1842d-fa65-4f2e-b76d-eb8d8bce75ef'
  },
  {
    _id: '290f1538-552c-4dc7-bdc4-1bd8d1e979e7',
    title: 'Felon',
    genres: ['Travel'],
    publicationDate: '11/30/1931',
    publisher: 'Devshare',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '728417215-0',
    language: 'Bislama',
    pageCount: 254,
    price: 0.82,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'd20d4350-ffc6-4125-959e-7a0e6b0480c4'
  },
  {
    _id: '86ad3d6f-46af-495d-8636-751b79ce1c4f',
    title: 'White Diamond, The',
    genres: ['Paranormal', 'Dystopian', 'History', 'Thriller', 'Travel'],
    publicationDate: '12/14/1987',
    publisher: 'Babbleblab',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '686996074-7',
    language: 'French',
    pageCount: 658,
    price: 74.84,
    format: ['Hardcover'],
    authorId: '2849bbd5-81c3-48a1-bb3b-91c2dfcf4e46'
  },
  {
    _id: 'eacf85aa-237e-43f7-8bd0-3e4551d80f8e',
    title: 'Cleanflix',
    genres: ['Paranormal', 'Science Fiction', 'Personal Development'],
    publicationDate: '7/28/1910',
    publisher: 'Thoughtmix',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '830480217-1',
    language: 'Pashto',
    pageCount: 98,
    price: 63.77,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '001f1281-2ae9-4979-bd3a-c44dd3381af6'
  },
  {
    _id: 'b10af69f-697a-4629-afdb-13b034d0b386',
    title: 'Jack the Ripper',
    genres: [
      'Motivational',
      'Self-help',
      'Paranormal',
      'Adventure',
      'Guide / How-to'
    ],
    publicationDate: '3/28/1976',
    publisher: 'Gigashots',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '952078636-8',
    language: 'Montenegrin',
    pageCount: 776,
    price: 26.36,
    format: ['Paperback', 'Hardcover'],
    authorId: 'b9adbf2f-9a5f-4e66-bbbc-c46fde950257'
  },
  {
    _id: '06168eaf-a803-440d-a76a-dddc0402b361',
    title: 'Dust Factory, The',
    genres: ['Contemporary', 'Thriller', 'Health'],
    publicationDate: '12/10/1987',
    publisher: 'Oyoyo',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '324847913-2',
    language: 'West Frisian',
    pageCount: 594,
    price: 47.56,
    format: ['Paperback', 'Hardcover'],
    authorId: '11dd75aa-0e99-46cb-aa54-de092bdc7365'
  },
  {
    _id: '4a7f41df-f635-4994-8a0c-de2d41349c68',
    title: 'Easy to Love',
    genres: ['Humor', 'Contemporary', 'Bildungsroman', 'Self-help'],
    publicationDate: '3/13/1985',
    publisher: 'Flashset',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '055577261-6',
    language: 'Spanish',
    pageCount: 392,
    price: 62.07,
    format: ['Hardcover'],
    authorId: '29309feb-4a7a-4e55-88d2-747df6f763c5'
  },
  {
    _id: '6f2309f9-bfd2-4314-b191-637aa6e825b9',
    title: 'Buccaneer, The',
    genres: ['Health', 'Guide / How-to', 'Memoir'],
    publicationDate: '8/31/2012',
    publisher: 'Tagpad',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '009301174-1',
    language: 'Danish',
    pageCount: 969,
    price: 86.96,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '669c00a3-ff8b-4fb6-a913-f6bd5739a5b1'
  },
  {
    _id: '17727a85-81eb-4604-b42b-d208c78274cf',
    title: 'Kickboxer 4: The Aggressor',
    genres: ['Contemporary'],
    publicationDate: '10/1/2007',
    publisher: 'Cogilith',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '442439238-4',
    language: 'Hebrew',
    pageCount: 722,
    price: 17.19,
    format: ['Paperback'],
    authorId: 'f5131063-5aae-47e7-813b-e7e1d939e551'
  },
  {
    _id: '2a757419-09f7-4314-aac5-424c2a984e9c',
    title: 'Insect Woman, The (Nippon konchûki)',
    genres: [
      'Thriller',
      'History',
      'Paranormal',
      'Personal Development',
      'Motivational'
    ],
    publicationDate: '4/6/1961',
    publisher: 'Miboo',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '207540766-5',
    language: 'Swati',
    pageCount: 136,
    price: 77.77,
    format: ['Hardcover'],
    authorId: '83133959-f0e4-47b0-beba-7f7b1cd71a24'
  },
  {
    _id: '97e9121c-adaa-4cda-be34-c1573624bb1a',
    title: 'Dunce Class on Vacation, The (Hababam sinifi tatilde)',
    genres: ['History'],
    publicationDate: '5/17/1996',
    publisher: 'Yamia',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '885184867-X',
    language: 'Tswana',
    pageCount: 46,
    price: 40.45,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '948fa67c-57bd-48a9-8cd6-9d4ec32155ec'
  },
  {
    _id: '6c06e608-b73c-4ddb-91d6-f49efbb8856b',
    title: 'Crime of Father Amaro, The (Crimen del padre Amaro, El)',
    genres: ['Art', 'Gothic', 'Bildungsroman', 'Mystery', 'Science Fiction'],
    publicationDate: '3/30/1999',
    publisher: 'Fivebridge',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '563792984-X',
    language: 'Kashmiri',
    pageCount: 559,
    price: 31.46,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'c12eb14f-1e38-4ed2-a200-2900f7b6ccad'
  },
  {
    _id: '24bbf8d8-62d1-43a4-9af8-6e0ddbc14254',
    title: 'Madame Tutli-Putli',
    genres: ['Humor', 'Paranormal', 'Art', 'Children’s', 'Travel'],
    publicationDate: '9/24/1943',
    publisher: 'Avamba',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '556585686-8',
    language: 'Dari',
    pageCount: 631,
    price: 34.78,
    format: ['Paperback', 'Hardcover'],
    authorId: 'd0ec5aa2-8d3a-41e9-a1f0-cdb3d303eeea'
  },
  {
    _id: '60a172b9-33fa-4ced-a210-528c723b27de',
    title: 'Jason X',
    genres: ['Guide / How-to', 'Art', 'Contemporary'],
    publicationDate: '4/4/1974',
    publisher: 'Janyx',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '260150675-X',
    language: 'Catalan',
    pageCount: 649,
    price: 58.39,
    format: ['Hardcover'],
    authorId: '69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd'
  },
  {
    _id: '341f8b86-51e6-4470-91e6-9841f6ef04ee',
    title: 'Goodbye Pork Pie',
    genres: ['Families & Relationships', 'Southern Gothic Fiction'],
    publicationDate: '12/17/1951',
    publisher: 'Voomm',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '351732272-5',
    language: 'Persian',
    pageCount: 905,
    price: 95.66,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '928f9b9d-0b71-4aff-a971-6ba47a2428d0'
  },
  {
    _id: '0bc9c472-e2ff-4acf-9750-9d3fd665244b',
    title: 'Lost in Yonkers',
    genres: ['Mystery', 'Gothic', 'Historical fiction', 'Contemporary'],
    publicationDate: '5/7/1958',
    publisher: 'Thoughtstorm',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '391313223-6',
    language: 'Hungarian',
    pageCount: 540,
    price: 26.79,
    format: ['Paperback'],
    authorId: '95e88e8a-f672-45b8-aa8d-d2e7a4a20dc1'
  },
  {
    _id: '945f1fad-0314-4787-8ccf-6b12dec36f25',
    title: 'Strange Circus (Kimyô na sâkasu)',
    genres: [
      'Personal Development',
      'Mystery',
      'Motivational',
      'Families & Relationships'
    ],
    publicationDate: '9/28/1959',
    publisher: 'Jayo',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '060293041-3',
    language: 'Irish Gaelic',
    pageCount: 102,
    price: 69.34,
    format: ['Paperback'],
    authorId: 'bf51dd35-1eb4-4ba7-8ad2-36e726801715'
  },
  {
    _id: 'b9bce03a-071d-411e-92c0-4d70cc46cc85',
    title: 'Dirty Deeds',
    genres: ['Romance', 'Families & Relationships'],
    publicationDate: '5/8/1992',
    publisher: 'Meevee',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '572615423-1',
    language: 'Kazakh',
    pageCount: 949,
    price: 35.4,
    format: ['Hardcover', 'E-Book'],
    authorId: '6c17ed87-adc0-4b74-a785-4cf52b7a5a6d'
  },
  {
    _id: '21ec8137-1ab4-4df7-8026-3fee8cb502c8',
    title: "Project A 2 ('A' gai wak juk jap)",
    genres: ['Personal Development', 'Gothic'],
    publicationDate: '2/14/2012',
    publisher: 'Eidel',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '918593302-3',
    language: 'Romanian',
    pageCount: 53,
    price: 73.32,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'e1f96db2-1e3f-4423-a896-6e81b6619653'
  },
  {
    _id: 'd380615f-8c4f-4bdb-bd5a-15b87c0b3385',
    title: 'Don Juan DeMarco',
    genres: ['Thriller'],
    publicationDate: '6/18/1920',
    publisher: 'Edgeify',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '178311855-5',
    language: 'Assamese',
    pageCount: 442,
    price: 62.8,
    format: ['E-Book'],
    authorId: '7e3561ac-baa5-4657-a822-5e8225f3f860'
  },
  {
    _id: 'c037ff2b-0e48-44ca-9504-d10605ed633d',
    title: 'In Search of the Castaways',
    genres: ['Dystopian', 'Gothic', 'Southern Gothic Fiction'],
    publicationDate: '6/28/1906',
    publisher: 'Twitternation',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '492843133-2',
    language: 'Somali',
    pageCount: 632,
    price: 14.08,
    format: ['Hardcover'],
    authorId: 'ce9d7482-72d1-4067-9212-62516c7d139b'
  },
  {
    _id: '073390e6-eea3-44b7-a72d-c0bd47a11788',
    title: 'Summertime',
    genres: [
      'Romance',
      'Contemporary',
      'Travel',
      'Science Fiction',
      'Cookbook'
    ],
    publicationDate: '8/10/1924',
    publisher: 'Topicshots',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '547786067-7',
    language: 'Kashmiri',
    pageCount: 802,
    price: 64.74,
    format: ['E-Book'],
    authorId: '02c0d1d7-45a5-4429-a0aa-374313af1cc5'
  },
  {
    _id: '971cc2a0-859b-47f3-ac0f-13c4af46390c',
    title: 'The Nutcracker in 3D',
    genres: ['Romance', 'Cookbook', 'Travel', 'Paranormal'],
    publicationDate: '5/2/1903',
    publisher: 'Zazio',
    summary: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '861799355-3',
    language: 'Albanian',
    pageCount: 243,
    price: 38.57,
    format: ['E-Book'],
    authorId: '745afd57-6c27-41b6-8e24-e7db2f77ba4b'
  },
  {
    _id: '142f46e8-7244-4e9f-8d01-38a64c7465c8',
    title: 'Deadly Blessing',
    genres: ['Children’s', 'Humor', 'Adventure', 'Southern Gothic Fiction'],
    publicationDate: '11/7/1909',
    publisher: 'Skipfire',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '571361493-X',
    language: 'Kyrgyz',
    pageCount: 59,
    price: 12.18,
    format: ['Paperback'],
    authorId: '8c2a33f2-0222-454d-89d4-4b8b79071c49'
  },
  {
    _id: 'e090251f-1e1b-4e24-bd9a-932242e4af34',
    title: 'Onegin',
    genres: ['Romance'],
    publicationDate: '10/1/1904',
    publisher: 'Vinte',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '272628596-1',
    language: 'Bosnian',
    pageCount: 964,
    price: 89.8,
    format: ['Paperback', 'E-Book'],
    authorId: '904574ea-489e-4375-883d-2be72aa070be'
  },
  {
    _id: '9df2d732-5d9f-4a9d-a9df-64e12a20d7db',
    title: '13 Beloved (13 game sayawng)',
    genres: ['Children’s', 'Health', 'Personal Development', 'Guide / How-to'],
    publicationDate: '9/16/2005',
    publisher: 'Photolist',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '921088120-6',
    language: 'Telugu',
    pageCount: 976,
    price: 3.13,
    format: ['E-Book', 'Paperback'],
    authorId: '83a8878d-d10e-4c3d-adc5-ed88487d1888'
  },
  {
    _id: '82acf469-751d-4ac0-a451-f4be65a288a6',
    title: 'Man of the East',
    genres: [
      'Bildungsroman',
      'Personal Development',
      'History',
      'Science Fiction'
    ],
    publicationDate: '6/20/1913',
    publisher: 'Layo',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '252571831-3',
    language: 'Hebrew',
    pageCount: 177,
    price: 4.21,
    format: ['E-Book', 'Paperback'],
    authorId: '8b4128b2-cf2a-40e2-9130-9899c17853eb'
  },
  {
    _id: '4ed9bedb-ce73-4c2d-9184-39561ee33b19',
    title: 'Small Cuts (Petites coupures)',
    genres: ['Guide / How-to', 'Gothic', 'Mystery', 'Dystopian', 'Travel'],
    publicationDate: '12/16/1915',
    publisher: 'Fadeo',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '138960880-8',
    language: 'Italian',
    pageCount: 319,
    price: 9.72,
    format: ['E-Book'],
    authorId: '789c581a-3e2c-4880-ba97-a739ac4ed841'
  },
  {
    _id: '4641643d-0221-48a6-bb7b-d8b9561f4b8f',
    title: 'Less is More (Menos es más)',
    genres: ['Health', 'Gothic', 'Horror', 'Thriller', 'Paranormal'],
    publicationDate: '12/23/1994',
    publisher: 'Oba',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '265590146-0',
    language: 'German',
    pageCount: 807,
    price: 89.46,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '5a211082-2ff6-433a-a973-f71fdbed049e'
  },
  {
    _id: 'e032bb91-4a59-466e-b50d-ca5f661a20d0',
    title: 'Fire on the Mountain',
    genres: ['Children’s'],
    publicationDate: '10/17/1969',
    publisher: 'Mybuzz',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '213637667-5',
    language: 'Dzongkha',
    pageCount: 97,
    price: 69.05,
    format: ['Hardcover'],
    authorId: 'b9a1842d-fa65-4f2e-b76d-eb8d8bce75ef'
  },
  {
    _id: 'bf014122-dc62-4454-a7e3-70f7e02d13ac',
    title: 'In Therapy (Divã)',
    genres: [
      'Self-help',
      'Science Fiction',
      'Historical fiction',
      'Memoir',
      'Travel'
    ],
    publicationDate: '4/8/1991',
    publisher: 'Tazzy',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '465424462-X',
    language: 'Hungarian',
    pageCount: 683,
    price: 76.72,
    format: ['E-Book', 'Paperback'],
    authorId: '0dc9dc42-e585-40b2-87dd-6d70b56b4081'
  },
  {
    _id: '4bbd020e-610e-4cf5-ba72-bf69bb5a7f22',
    title: 'Black Sheep (Schwarze Schafe)',
    genres: ['Self-help', 'Dystopian', 'Children’s'],
    publicationDate: '4/11/1990',
    publisher: 'Voomm',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '347634753-2',
    language: 'Arabic',
    pageCount: 365,
    price: 44.28,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '449d8d31-cf8d-4db5-8e9b-2eddc19503e6'
  },
  {
    _id: 'b3fd8c86-6521-4563-8b5c-3a1e3d446149',
    title: 'First Shot',
    genres: ['Fiction', 'Horror', 'Health'],
    publicationDate: '8/1/1969',
    publisher: 'Dabshots',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '141617105-3',
    language: 'Tswana',
    pageCount: 596,
    price: 71.27,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '44146811-c29c-44a3-a186-010f7b5d9376'
  },
  {
    _id: '5dd12187-8847-48c4-ab30-ca94f43862aa',
    title: 'Sugar',
    genres: ['Adventure', 'Fiction', 'Health', 'Travel'],
    publicationDate: '7/15/1953',
    publisher: 'Skynoodle',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '576965757-X',
    language: 'Kannada',
    pageCount: 444,
    price: 71.81,
    format: ['Paperback', 'E-Book'],
    authorId: '04eb84a6-6107-4ad7-8f1e-9aa7ea0ad472'
  },
  {
    _id: '270208f6-a947-427c-8017-0bbf961a28f5',
    title: 'Cursed',
    genres: ['Families & Relationships', 'Travel'],
    publicationDate: '11/2/2001',
    publisher: 'Realbridge',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '111862181-6',
    language: 'Kyrgyz',
    pageCount: 541,
    price: 68.15,
    format: ['Paperback'],
    authorId: '4ecb2ba5-45ad-4d90-801f-cba7ba5fd095'
  },
  {
    _id: 'a74cc3a3-e8cb-4751-89de-22eea8f64393',
    title: 'They Came to Cordura',
    genres: [
      'Dystopian',
      'Contemporary',
      'Travel',
      'Personal Development',
      'Historical fiction'
    ],
    publicationDate: '10/25/1979',
    publisher: 'Brainlounge',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '425615910-X',
    language: 'Assamese',
    pageCount: 480,
    price: 32.16,
    format: ['Hardcover', 'Paperback'],
    authorId: '843c38ae-9d74-44e1-aca2-edce2ca95280'
  },
  {
    _id: '9495a847-edd0-41e4-bd40-239a8e0de275',
    title: 'FC Venus',
    genres: ['Southern Gothic Fiction', 'Science Fiction', 'Dystopian'],
    publicationDate: '11/11/2009',
    publisher: 'Oozz',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '728664465-3',
    language: 'Haitian Creole',
    pageCount: 327,
    price: 83.76,
    format: ['E-Book'],
    authorId: '36f9f627-791c-4476-8a6c-cae6807be704'
  },
  {
    _id: '23928e40-be04-4d20-8320-face45ebc2a1',
    title: 'Dr. Dolittle: Tail to the Chief',
    genres: ['Adventure', 'Families & Relationships'],
    publicationDate: '1/1/2003',
    publisher: 'Wikizz',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '156875837-5',
    language: 'Quechua',
    pageCount: 943,
    price: 33.6,
    format: ['Hardcover'],
    authorId: '6b979044-6c52-4d95-944d-b0f08c724f1c'
  },
  {
    _id: '76ef051b-97ae-410e-a685-6a018acdb75d',
    title: 'Dylan Moran: Yeah, Yeah',
    genres: ['Gothic', 'Art'],
    publicationDate: '9/30/1968',
    publisher: 'Jabbertype',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '587941780-8',
    language: 'West Frisian',
    pageCount: 626,
    price: 53.76,
    format: ['E-Book', 'Hardcover'],
    authorId: 'ba5fb3bd-840b-4590-8176-6e1ec29ff1f7'
  },
  {
    _id: '17b4af73-dc3f-4f96-8350-05a45200253d',
    title: "What's in a Name (Prénom, Le)",
    genres: ['Memoir', 'History', 'Fiction', 'Contemporary'],
    publicationDate: '2/5/2020',
    publisher: 'Demimbu',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '334245958-1',
    language: 'Tetum',
    pageCount: 755,
    price: 71.7,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'ec940e39-f0cb-4629-a9fd-ba91873a006b'
  },
  {
    _id: '49cbbb3f-f9b6-47db-8805-7153a2da61a7',
    title: 'Lies and Illusions',
    genres: ['History'],
    publicationDate: '1/7/1938',
    publisher: 'Flipopia',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '459406207-5',
    language: 'Icelandic',
    pageCount: 571,
    price: 92.51,
    format: ['Paperback', 'E-Book'],
    authorId: '92cc5f96-3d5f-4ac8-a0d6-9630f5a02ec8'
  },
  {
    _id: '229a1635-b9bf-417b-b078-4bbb9d20d75f',
    title: 'Gangsters',
    genres: [
      'Historical fiction',
      'Travel',
      'Fiction',
      'Motivational',
      'Gothic'
    ],
    publicationDate: '4/6/1904',
    publisher: 'Livefish',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '250766992-6',
    language: 'Lao',
    pageCount: 0,
    price: 99.83,
    format: ['E-Book'],
    authorId: '38cb7ec6-0150-4382-bb7b-79fc3d8ef293'
  },
  {
    _id: 'b92456d8-fe19-4c8d-8dab-8bf1879a79fe',
    title: 'Violin, El',
    genres: ['Fiction', 'Romance', 'Travel', 'Cookbook'],
    publicationDate: '10/27/1970',
    publisher: 'Yadel',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '465779224-5',
    language: 'Arabic',
    pageCount: 818,
    price: 37.88,
    format: ['E-Book'],
    authorId: 'fc6c44ff-62cc-4019-8816-00eff3686d31'
  },
  {
    _id: '8d64715d-ee84-4a97-af85-2baa6180882e',
    title: 'Klip (Clip)',
    genres: [
      'Historical fiction',
      'Children’s',
      'Personal Development',
      'Bildungsroman',
      'Adventure'
    ],
    publicationDate: '8/3/1971',
    publisher: 'Demivee',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '281829443-6',
    language: 'Thai',
    pageCount: 200,
    price: 40.39,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '4a817c42-ca8c-4be8-8df6-02e99b357a45'
  },
  {
    _id: '00f424a8-03a6-4c4a-bf26-905c20a3e601',
    title: 'Winslow Boy, The',
    genres: ['Travel'],
    publicationDate: '8/25/2017',
    publisher: 'Jayo',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '651175592-4',
    language: 'Moldovan',
    pageCount: 910,
    price: 72.04,
    format: ['Paperback'],
    authorId: '0d2349b7-cca0-4054-ac1b-bf79888e9685'
  },
  {
    _id: '0f72146c-86c8-4125-872a-f2ac55d2251f',
    title: 'Werckmeister Harmonies (Werckmeister harmóniák)',
    genres: ['Self-help', 'Cookbook'],
    publicationDate: '5/13/1975',
    publisher: 'Brainsphere',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '492436830-X',
    language: 'Catalan',
    pageCount: 251,
    price: 56.32,
    format: ['E-Book', 'Paperback'],
    authorId: '434e8f61-3e3a-4c8a-85fc-1224950998b7'
  },
  {
    _id: '272c682a-6258-4ea0-812d-f7a815ab0285',
    title: 'Aziz Ansari: Intimate Moments for a Sensual Evening',
    genres: ['Bildungsroman'],
    publicationDate: '2/8/2023',
    publisher: 'Thoughtbridge',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '227899194-9',
    language: 'Gagauz',
    pageCount: 17,
    price: 63.59,
    format: ['Hardcover'],
    authorId: 'a67ed3f0-7253-4b50-bb1d-03a0372bd78b'
  },
  {
    _id: 'eb32b579-f7d8-4b92-b95b-92138677e2b6',
    title: 'Walker',
    genres: ['Science Fiction', 'Cookbook', 'Mystery', 'Thriller'],
    publicationDate: '10/21/1994',
    publisher: 'Reallinks',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '863767084-9',
    language: 'Zulu',
    pageCount: 878,
    price: 64.07,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '7a71d1b2-5ff1-4b47-a861-9c4089c6b768'
  },
  {
    _id: '94bfc449-02a1-45e3-9b5a-3db466c0e39d',
    title: 'Shine a Light',
    genres: [
      'Families & Relationships',
      'Memoir',
      'Fiction',
      'Romance',
      'Mystery'
    ],
    publicationDate: '10/24/1951',
    publisher: 'Innotype',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '676296652-7',
    language: 'Kurdish',
    pageCount: 613,
    price: 5.78,
    format: ['Paperback', 'Hardcover'],
    authorId: '00296062-6b0d-4f54-aa58-14597d3475c8'
  },
  {
    _id: '066ba7f9-9297-45cb-83fd-61312fab431e',
    title: 'Hotline',
    genres: [
      'Paranormal',
      'Families & Relationships',
      'Adventure',
      'Contemporary',
      'Self-help'
    ],
    publicationDate: '12/14/1968',
    publisher: 'Quimm',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '524587810-0',
    language: 'Luxembourgish',
    pageCount: 682,
    price: 72.06,
    format: ['Paperback'],
    authorId: '743f2a28-1071-4335-b437-d642588927ab'
  },
  {
    _id: '112c8c75-9fa7-45aa-81be-4e391d517b36',
    title: 'Get Over It',
    genres: [
      'Self-help',
      'Families & Relationships',
      'Bildungsroman',
      'Art',
      'Contemporary'
    ],
    publicationDate: '7/10/1937',
    publisher: 'Thoughtbridge',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '611011128-7',
    language: 'Portuguese',
    pageCount: 354,
    price: 0.43,
    format: ['Paperback', 'Hardcover'],
    authorId: '47ac3341-6d18-46ba-afc8-596f10030bd3'
  },
  {
    _id: '5575647a-a686-474b-9ae8-fd49a08a0414',
    title: 'Ringu 2 (Ring 2)',
    genres: ['Art'],
    publicationDate: '3/4/1949',
    publisher: 'Wikibox',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '646943321-9',
    language: 'Norwegian',
    pageCount: 627,
    price: 87.94,
    format: ['Paperback', 'Hardcover'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: '357e776a-307a-4936-af2c-81339cb8bf5e',
    title: 'Bootmen',
    genres: ['Families & Relationships', 'History', 'Humor', 'Paranormal'],
    publicationDate: '2/25/1915',
    publisher: 'Fivebridge',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '997012037-9',
    language: 'Malayalam',
    pageCount: 169,
    price: 73.35,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '0bbf8a21-3237-4951-9035-efd68a0b05bd'
  },
  {
    _id: '6fdf7730-e5ec-406f-8f3f-98a0a7265844',
    title: 'High on Crack Street: Lost Lives in Lowell',
    genres: ['Self-help', 'Contemporary', 'Thriller', 'Mystery', 'Dystopian'],
    publicationDate: '8/15/1949',
    publisher: 'Dabvine',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '660420922-9',
    language: 'Belarusian',
    pageCount: 113,
    price: 58.2,
    format: ['E-Book'],
    authorId: '8615dc19-f563-41ea-a37d-f4ddf988f463'
  },
  {
    _id: '95e2e8a5-96d7-459f-9d56-55213e4dc173',
    title: "Mom's Night Out",
    genres: ['Travel', 'Romance', 'Thriller', 'Memoir', 'Mystery'],
    publicationDate: '5/5/1983',
    publisher: 'Cogibox',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '133461680-9',
    language: 'Spanish',
    pageCount: 361,
    price: 58.81,
    format: ['Hardcover'],
    authorId: '963cf4e5-5093-404c-bab8-92a74a1a9ba6'
  },
  {
    _id: '77ee69cf-1351-4ae7-b9e8-798ae8b47c81',
    title: 'Commando',
    genres: ['Contemporary', 'Romance', 'Horror'],
    publicationDate: '7/19/2003',
    publisher: 'Topdrive',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '614488277-4',
    language: 'English',
    pageCount: 512,
    price: 84.04,
    format: ['E-Book', 'Paperback'],
    authorId: '5a5c7c5f-8258-433c-aed7-2a498d355659'
  },
  {
    _id: 'd8aad97c-50e5-45e8-bb4e-0fdf6439c580',
    title:
      'Three Kingdoms: Resurrection of the Dragon (Saam gwok dzi gin lung se gap)',
    genres: ['Children’s'],
    publicationDate: '7/13/1996',
    publisher: 'Brainverse',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '494058371-6',
    language: 'Icelandic',
    pageCount: 992,
    price: 46.37,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'fe943a18-1ea9-49ed-a5cd-30967dd95bd2'
  },
  {
    _id: 'e803d28e-920b-468c-9730-fb19974f2cb5',
    title: 'Kings Row',
    genres: ['Cookbook', 'Science Fiction', 'Humor', 'Children’s', 'Adventure'],
    publicationDate: '3/24/1912',
    publisher: 'Rhyloo',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '454780051-0',
    language: 'Azeri',
    pageCount: 386,
    price: 78.04,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'e465ba22-78a0-473a-aa6e-4dc28a031fbf'
  },
  {
    _id: '05490a8d-6a72-429c-994d-0498117f6a34',
    title: 'Rabbit Test',
    genres: ['Southern Gothic Fiction', 'Health', 'Dystopian'],
    publicationDate: '12/14/1985',
    publisher: 'Twiyo',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '455890787-7',
    language: 'Swedish',
    pageCount: 240,
    price: 41.09,
    format: ['Paperback'],
    authorId: '7cdbc5ad-12b8-428d-9ab8-57d117328403'
  },
  {
    _id: 'be38347e-edea-4fb2-acc7-49cd6c5d5a1c',
    title: 'Forever Strong',
    genres: ['Science Fiction'],
    publicationDate: '4/25/1906',
    publisher: 'Kwinu',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '638468684-8',
    language: 'Tajik',
    pageCount: 823,
    price: 12.77,
    format: ['Paperback'],
    authorId: '4e880e2f-9b90-413e-83b4-743431624957'
  },
  {
    _id: '8d310d7c-0322-4ac8-8e33-fbeeb09cc82f',
    title: 'Edukators, The (Die Fetten Jahre sind vorbei)',
    genres: ['Travel', 'Gothic', 'Science Fiction'],
    publicationDate: '1/2/1919',
    publisher: 'Eare',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '642452824-5',
    language: 'Fijian',
    pageCount: 42,
    price: 47.46,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'f36cd039-12da-4747-9bb8-ec8666fe62f3'
  },
  {
    _id: '92c1d796-792f-4818-8813-91eca2111e49',
    title: '$ellebrity (Sellebrity)',
    genres: ['Fiction', 'Motivational', 'Dystopian', 'Paranormal'],
    publicationDate: '6/15/1994',
    publisher: 'Skipfire',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '551255056-X',
    language: 'Dzongkha',
    pageCount: 653,
    price: 39.06,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'f44f7f78-2326-465b-8abe-9724da08ac22'
  },
  {
    _id: 'aa2f1ecb-026b-4dc6-afe3-7f6640b34056',
    title: 'Basic',
    genres: ['Memoir', 'Travel', 'Self-help', 'Gothic', 'Historical fiction'],
    publicationDate: '11/6/1976',
    publisher: 'Gigashots',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '005091419-7',
    language: 'Irish Gaelic',
    pageCount: 693,
    price: 4.45,
    format: ['Paperback', 'Hardcover'],
    authorId: '89401b92-160a-4248-8e64-ad9012889d2e'
  },
  {
    _id: '5e0e74ca-77f7-4b9f-9cda-719b6dfcfe78',
    title: 'The Way He Looks',
    genres: [
      'Personal Development',
      'Science Fiction',
      'Dystopian',
      'Paranormal'
    ],
    publicationDate: '1/21/1900',
    publisher: 'Skyvu',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '395253644-X',
    language: 'Kyrgyz',
    pageCount: 807,
    price: 1.61,
    format: ['E-Book', 'Hardcover'],
    authorId: '8ac91c1f-2953-4700-a5b3-65ca01c03bf8'
  },
  {
    _id: 'f9d9fe9b-e931-4eb8-8709-8489150daed9',
    title: 'Megan Is Missing',
    genres: ['Science Fiction', 'Contemporary', 'Thriller'],
    publicationDate: '12/21/1923',
    publisher: 'Linkbridge',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '819048469-9',
    language: 'German',
    pageCount: 491,
    price: 17.96,
    format: ['Hardcover', 'E-Book'],
    authorId: '38efca15-98d3-46b5-9b8d-fa27546c21b6'
  },
  {
    _id: '7da10a25-8af6-462c-b3e7-5d3cb1dd66fb',
    title: 'Jungle de Ikou (Jungre de Ikou)',
    genres: [
      'Memoir',
      'Romance',
      'Southern Gothic Fiction',
      'Fiction',
      'Personal Development'
    ],
    publicationDate: '2/27/1930',
    publisher: 'Tekfly',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '196130791-X',
    language: 'Oriya',
    pageCount: 706,
    price: 35.68,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '04e3a9e3-49dd-476b-a7f4-5f2c6f77b040'
  },
  {
    _id: 'd5570ddc-de52-46b3-807d-9ae59d6bb76b',
    title: 'Fresh Horses',
    genres: ['History', 'Adventure', 'Children’s', 'Families & Relationships'],
    publicationDate: '7/27/2014',
    publisher: 'Camido',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    isbn: '697402602-1',
    language: 'Ndebele',
    pageCount: 591,
    price: 73.07,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '963cf4e5-5093-404c-bab8-92a74a1a9ba6'
  },
  {
    _id: '00d967a4-d081-420e-8a48-692049e27566',
    title: 'Trust Me',
    genres: ['Romance', 'Adventure', 'Dystopian', 'Health', 'Contemporary'],
    publicationDate: '1/20/1940',
    publisher: 'Voomm',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '002347045-3',
    language: 'Luxembourgish',
    pageCount: 144,
    price: 4.38,
    format: ['Paperback', 'E-Book'],
    authorId: '0d2f602a-882e-4850-b564-8101e1e871af'
  },
  {
    _id: 'defc8f99-50a9-46a7-b9a6-b4f03bc79c92',
    title: 'Manta, Manta',
    genres: ['Southern Gothic Fiction', 'Families & Relationships'],
    publicationDate: '1/9/1908',
    publisher: 'Avaveo',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '696252408-0',
    language: 'Papiamento',
    pageCount: 158,
    price: 97.81,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '954b477c-4d10-42b1-96c9-59dbedbf4c54'
  },
  {
    _id: 'ca18c740-34bd-4987-8bfe-307dba0159e1',
    title: 'Towering Inferno, The',
    genres: ['Mystery', 'Guide / How-to'],
    publicationDate: '8/27/1965',
    publisher: 'Livetube',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '716539265-3',
    language: 'Tok Pisin',
    pageCount: 973,
    price: 91.78,
    format: ['Hardcover', 'E-Book'],
    authorId: '9d71c305-43e5-465f-85ff-17e5b45fb72e'
  },
  {
    _id: 'ad012c61-b8d7-4b7e-8925-18a7d5341c60',
    title: 'My Stepmother Is an Alien',
    genres: ['Horror', 'Thriller'],
    publicationDate: '5/31/2019',
    publisher: 'Eayo',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '907522793-0',
    language: 'Zulu',
    pageCount: 843,
    price: 98.26,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'e6f5f286-aca9-43e7-970a-21a444677ab5'
  },
  {
    _id: '0464d2cf-d5b2-4087-bbef-db9eda7300cf',
    title: 'Wassup Rockers',
    genres: ['Guide / How-to'],
    publicationDate: '4/9/1985',
    publisher: 'Realbridge',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '106209854-4',
    language: 'Aymara',
    pageCount: 487,
    price: 21.12,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '75c77358-69d9-41f8-b6d1-760267ee7ebe'
  },
  {
    _id: 'f878c52b-4b22-42e6-8dcd-209f94e3333a',
    title: 'The Story of Asya Klyachina',
    genres: ['Horror'],
    publicationDate: '1/25/1991',
    publisher: 'Divavu',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '608559750-9',
    language: 'German',
    pageCount: 432,
    price: 30.04,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '44661fef-082d-421f-b2c0-b6bc3698d4f5'
  },
  {
    _id: 'e076a5e7-126d-435b-a7ff-89d931335a09',
    title: 'Ambush (Mai fu)',
    genres: ['Personal Development', 'Mystery'],
    publicationDate: '8/18/1938',
    publisher: 'Gabtype',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '643004491-2',
    language: 'Bosnian',
    pageCount: 824,
    price: 50.21,
    format: ['Paperback'],
    authorId: 'ed35bc3b-f204-4cd1-bc34-ad364e06fc39'
  },
  {
    _id: '218fd93a-807c-466a-9bea-7f9e1c3f99d7',
    title: 'Rhapsody in August (Hachi-gatsu no kyôshikyoku)',
    genres: [
      'Self-help',
      'Motivational',
      'Bildungsroman',
      'Southern Gothic Fiction',
      'History'
    ],
    publicationDate: '5/14/2023',
    publisher: 'Yamia',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '807661969-6',
    language: 'Telugu',
    pageCount: 192,
    price: 4.94,
    format: ['Paperback'],
    authorId: 'fe7032fe-9fb2-44ea-b3a1-d635617cd17d'
  },
  {
    _id: 'd41e243e-d8b4-4432-a582-9324070c2bcb',
    title: "Gulliver's Travels",
    genres: ['Contemporary', 'Romance', 'Travel', 'Adventure'],
    publicationDate: '5/16/1975',
    publisher: 'Twimbo',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '879180532-5',
    language: 'Dutch',
    pageCount: 127,
    price: 32.12,
    format: ['E-Book'],
    authorId: '409aff3e-d33d-447c-85f9-f05ee676dcda'
  },
  {
    _id: 'd96ddc0d-e943-44c1-8f81-20dcaab4e70c',
    title: 'Lilya 4-Ever (Lilja 4-ever)',
    genres: ['Memoir', 'Adventure'],
    publicationDate: '7/11/1958',
    publisher: 'Browsedrive',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '046520063-X',
    language: 'Tsonga',
    pageCount: 207,
    price: 11.02,
    format: ['E-Book'],
    authorId: 'd5995759-49a9-411e-8b26-22c3c65eaef7'
  },
  {
    _id: 'b3b4ca69-cd59-4c8f-abc4-05d9880e6a2e',
    title: 'Carriers',
    genres: ['Gothic', 'Guide / How-to', 'Romance', 'Children’s'],
    publicationDate: '4/16/1963',
    publisher: 'Avaveo',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '074587461-4',
    language: 'Telugu',
    pageCount: 729,
    price: 32,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '140bb64f-c2ca-4250-97a7-7d5c395d1ea2'
  },
  {
    _id: 'fe9ec5fe-8c67-4507-a250-91edb6edcb93',
    title: 'Hustlers, The (Veijarit)',
    genres: ['Contemporary'],
    publicationDate: '11/3/1920',
    publisher: 'Quimm',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '544211778-1',
    language: 'Korean',
    pageCount: 427,
    price: 15.9,
    format: ['E-Book'],
    authorId: 'f3159d8b-d89b-4741-a77f-ea80b0998491'
  },
  {
    _id: '508ef941-0fb4-4195-a9ff-e94111d260b2',
    title:
      'Unintentional Kidnapping of Mrs. Elfriede Ott, The (Die Unabsichtliche Entführung der Frau Elfriede Ott)',
    genres: ['Memoir', 'Travel'],
    publicationDate: '6/28/1931',
    publisher: 'Jayo',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '799813541-7',
    language: 'Sotho',
    pageCount: 665,
    price: 24.62,
    format: ['E-Book'],
    authorId: '4cd2372f-081d-438d-9a4a-db8b68168678'
  },
  {
    _id: 'bc181f85-cb3a-408a-a3f7-a86e9cc24473',
    title: 'Lust for Love',
    genres: ['Adventure', 'Romance', 'Cookbook', 'Art', 'Health'],
    publicationDate: '7/22/1981',
    publisher: 'Kwilith',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '258331717-2',
    language: 'Finnish',
    pageCount: 678,
    price: 76.28,
    format: ['Hardcover'],
    authorId: '29309feb-4a7a-4e55-88d2-747df6f763c5'
  },
  {
    _id: 'bab49ca6-a079-410d-acb6-1ad1172a4d9d',
    title: 'Derailed',
    genres: ['Art', 'Paranormal'],
    publicationDate: '7/15/1935',
    publisher: 'Avaveo',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '726145335-8',
    language: 'Arabic',
    pageCount: 238,
    price: 57.04,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '0361b8c4-b166-4025-ba18-4f5893c101a5'
  },
  {
    _id: 'b28043c7-1f52-4754-9710-027dbeab0381',
    title: 'Nothing But Trouble',
    genres: ['Paranormal', 'Fiction'],
    publicationDate: '7/25/1930',
    publisher: 'Gigashots',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '895258943-2',
    language: 'Hindi',
    pageCount: 166,
    price: 6.24,
    format: ['Paperback'],
    authorId: '8f05cd37-2622-4c6a-a5a7-d9d3b48cb3fe'
  },
  {
    _id: '1f8ebc58-d903-4c14-9d9b-414464418e0b',
    title: 'Quest, The',
    genres: ['Humor', 'Travel', 'Self-help'],
    publicationDate: '3/1/1979',
    publisher: 'Katz',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '870539231-4',
    language: 'Albanian',
    pageCount: 739,
    price: 7.49,
    format: ['E-Book'],
    authorId: 'b1fa1dd5-1ac3-4812-86e7-394b18e8bb7c'
  },
  {
    _id: 'e03ca6cc-0402-4b33-91d7-0567786d0be9',
    title: 'Wilbur Wants to Kill Himself',
    genres: ['Travel', 'Mystery', 'Art'],
    publicationDate: '2/15/1993',
    publisher: 'Brightdog',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '343070748-X',
    language: 'Aymara',
    pageCount: 131,
    price: 63.36,
    format: ['E-Book'],
    authorId: '83ce2367-949a-41ad-956b-5640a290c63a'
  },
  {
    _id: 'b010bcbd-36f2-4da8-836e-fb9af5d91025',
    title: 'Ringers: Lord of the Fans',
    genres: ['Gothic', 'Travel', 'Fiction'],
    publicationDate: '1/7/2005',
    publisher: 'Mydeo',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '509689489-4',
    language: 'Latvian',
    pageCount: 681,
    price: 96.51,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '347ae575-3cf2-4081-8b31-4a3674288d38'
  },
  {
    _id: 'd0117d84-0aed-4596-a122-858c64d54491',
    title: 'Amador',
    genres: ['Self-help', 'Art'],
    publicationDate: '8/5/1914',
    publisher: 'Leenti',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '756727660-7',
    language: 'Korean',
    pageCount: 118,
    price: 72.35,
    format: ['E-Book'],
    authorId: 'dcc3ecde-e73e-438f-8753-64a6508b9f90'
  },
  {
    _id: '62d35c56-d9fb-4560-a52b-b96644cf0600',
    title: 'Legend of the Lost',
    genres: ['Art', 'Science Fiction', 'Southern Gothic Fiction', 'Fiction'],
    publicationDate: '4/12/1901',
    publisher: 'Flipbug',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '749323975-4',
    language: 'Belarusian',
    pageCount: 409,
    price: 8.25,
    format: ['Hardcover'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: '65f3a805-5024-474f-b889-e61daae19df5',
    title: 'Nanny Diaries, The',
    genres: ['Guide / How-to', 'Cookbook'],
    publicationDate: '1/1/1974',
    publisher: 'Lajo',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '146457573-8',
    language: 'Fijian',
    pageCount: 895,
    price: 43.78,
    format: ['Paperback'],
    authorId: 'd0ec5aa2-8d3a-41e9-a1f0-cdb3d303eeea'
  },
  {
    _id: 'f17cb91e-1f40-4441-8373-781e639b5a68',
    title: 'Sabah',
    genres: [
      'Self-help',
      'Guide / How-to',
      'Paranormal',
      'Southern Gothic Fiction'
    ],
    publicationDate: '10/16/1928',
    publisher: 'Roodel',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '827138764-2',
    language: 'Tsonga',
    pageCount: 198,
    price: 95.49,
    format: ['Hardcover', 'E-Book'],
    authorId: 'ba5fb3bd-840b-4590-8176-6e1ec29ff1f7'
  },
  {
    _id: 'da595b11-925b-4513-8664-b02123fd3175',
    title: 'Black Legion',
    genres: [
      'Families & Relationships',
      'Health',
      'Bildungsroman',
      'Paranormal',
      'Cookbook'
    ],
    publicationDate: '5/14/2015',
    publisher: 'Rhynoodle',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '648322627-6',
    language: 'Swahili',
    pageCount: 482,
    price: 63.64,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '6a072217-4ef7-4c73-9117-7a51f0cae605'
  },
  {
    _id: 'de9d079a-659b-4061-b71d-40a15f06fd77',
    title: 'Trapped Ashes',
    genres: ['Families & Relationships', 'Health'],
    publicationDate: '8/26/1916',
    publisher: 'Cogibox',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '345341896-4',
    language: 'New Zealand Sign Language',
    pageCount: 869,
    price: 93.53,
    format: ['Paperback', 'E-Book'],
    authorId: '8594f194-329c-4248-acf8-81571e2bc9ee'
  },
  {
    _id: 'd4589b40-ef17-4ec1-9f1e-3fcba90deefe',
    title: 'Overcoat, The (Il cappotto)',
    genres: ['Humor', 'Thriller', 'Guide / How-to'],
    publicationDate: '7/3/1931',
    publisher: 'Blogspan',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '242564575-6',
    language: 'Māori',
    pageCount: 744,
    price: 96.24,
    format: ['Paperback', 'Hardcover'],
    authorId: '6f4b066f-ca50-4ca9-9dd2-5f8ab9c75550'
  },
  {
    _id: 'ae71177b-95ab-49d7-bb1c-a2d2a3f46c33',
    title: 'Flow',
    genres: ['Adventure', 'Motivational', 'Children’s', 'Humor'],
    publicationDate: '6/13/1959',
    publisher: 'Gabtune',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '558535187-7',
    language: 'Irish Gaelic',
    pageCount: 608,
    price: 80.06,
    format: ['Hardcover', 'E-Book'],
    authorId: '802d98db-0a9c-4539-8ad4-a6bc19385fb9'
  },
  {
    _id: 'afa9dae5-7b5c-4e7c-8b2b-3ca787bc33c5',
    title:
      'House with Laughing Windows, The (Casa dalle finestre che ridono, La)',
    genres: ['Contemporary', 'Bildungsroman', 'Horror'],
    publicationDate: '2/19/1978',
    publisher: 'Dynabox',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '008192488-7',
    language: 'Fijian',
    pageCount: 489,
    price: 91.89,
    format: ['Hardcover', 'Paperback'],
    authorId: '64404e92-0886-4e7a-9fbf-d7c3e66c8c01'
  },
  {
    _id: 'e6db7f5a-3cba-4838-bc33-15d0c316730c',
    title: 'Jive Turkey',
    genres: ['Self-help'],
    publicationDate: '11/25/1916',
    publisher: 'Photobug',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '422283886-1',
    language: 'Maltese',
    pageCount: 335,
    price: 91.58,
    format: ['E-Book'],
    authorId: '622fa91a-2c5f-49dd-b86a-548421b93e76'
  },
  {
    _id: '8ea95ef4-6bce-4110-984e-d9b7d3c4efee',
    title: 'Fire',
    genres: ['Health', 'Gothic'],
    publicationDate: '1/25/1986',
    publisher: 'Kaymbo',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '968416575-7',
    language: 'Gujarati',
    pageCount: 468,
    price: 77.31,
    format: ['Hardcover', 'E-Book'],
    authorId: 'd02e41ff-c7c8-45fc-bd60-517bfbd21f8f'
  },
  {
    _id: 'b03358e8-e0c3-4121-a4fa-ea2e59c7c7d0',
    title: 'Who Am I (Kein System Ist Sicher)',
    genres: ['Health', 'Self-help', 'Horror'],
    publicationDate: '7/8/1906',
    publisher: 'Eamia',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '442688359-8',
    language: 'Telugu',
    pageCount: 498,
    price: 3.2,
    format: ['Paperback'],
    authorId: '03bc2e14-c55d-4e31-a183-d1f6ffdc1638'
  },
  {
    _id: '55bd691d-075f-4691-b4b7-3a77794c6335',
    title:
      'Glamorous Life of Sachiko Hanai, The (Hatsujô kateikyôshi: sensei no aijiru)',
    genres: ['Memoir'],
    publicationDate: '10/9/1936',
    publisher: 'Vimbo',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '292299065-6',
    language: 'Tsonga',
    pageCount: 227,
    price: 32.24,
    format: ['E-Book'],
    authorId: 'd6caf59c-f74c-415a-a5c7-d80ecafd1c0b'
  },
  {
    _id: 'f707e4ec-78b9-4b89-bbb5-df40d316a8e9',
    title: 'Wuthering Heights',
    genres: ['Mystery'],
    publicationDate: '11/13/2006',
    publisher: 'Tagcat',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '271377294-X',
    language: 'Kashmiri',
    pageCount: 719,
    price: 17.98,
    format: ['Paperback'],
    authorId: '833ffd7f-ba4c-42bb-8671-1f38985707e3'
  },
  {
    _id: '12c075f2-91d3-4b12-b3d3-0c71e8e08c86',
    title: 'Rashomon (Rashômon)',
    genres: ['Science Fiction'],
    publicationDate: '9/3/1927',
    publisher: 'Janyx',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '460563613-7',
    language: 'Kazakh',
    pageCount: 53,
    price: 86.32,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'd962a2d7-4656-450a-80bc-dc38aafb6407'
  },
  {
    _id: 'c648cd45-35ca-459d-b79a-0e51c1959320',
    title: 'Body Snatcher, The',
    genres: ['Health'],
    publicationDate: '8/9/1933',
    publisher: 'Plambee',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '084805029-0',
    language: 'Tswana',
    pageCount: 52,
    price: 98.26,
    format: ['E-Book'],
    authorId: 'ad923796-1ad6-4a1d-88b6-454a04412573'
  },
  {
    _id: 'b3b12d88-c514-4a72-aa01-bc7e2dce17d6',
    title: 'Catch That Kid',
    genres: ['Contemporary', 'Art'],
    publicationDate: '8/24/1911',
    publisher: 'Meeveo',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '381311810-X',
    language: 'Irish Gaelic',
    pageCount: 956,
    price: 7.06,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '86abb841-936f-4afe-bce9-73199f45565f'
  },
  {
    _id: '97f207a5-9446-4088-ba69-46c90a172041',
    title: 'Execution of P, The (Kinatay)',
    genres: ['Romance'],
    publicationDate: '12/17/1907',
    publisher: 'Camido',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '332299586-0',
    language: 'Hebrew',
    pageCount: 595,
    price: 10.98,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '309527ab-c171-4f50-9e20-a221e820eed3'
  },
  {
    _id: 'c24becf6-0017-479b-b1f4-a2afc912c3c4',
    title: 'To Catch a Thief',
    genres: ['Guide / How-to'],
    publicationDate: '4/25/1904',
    publisher: 'Flashset',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '680167934-1',
    language: 'West Frisian',
    pageCount: 144,
    price: 31.93,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'dacb27a3-b968-4806-b801-d2342c6e964b'
  },
  {
    _id: 'fb69c58d-8e11-4dd1-961f-beae1bec92c4',
    title: 'Good Guys Wear Black',
    genres: ['Mystery'],
    publicationDate: '12/23/1965',
    publisher: 'Divape',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '635791357-X',
    language: 'Estonian',
    pageCount: 569,
    price: 31.12,
    format: ['E-Book'],
    authorId: 'c9abbdca-433f-4e84-89cb-dc1b07e01204'
  },
  {
    _id: 'd7ad2e08-6c46-4769-baa3-391054fdbd75',
    title: 'Macao',
    genres: ['Fiction', 'Paranormal', 'Self-help', 'Families & Relationships'],
    publicationDate: '5/21/1979',
    publisher: 'Blogspan',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '807163371-2',
    language: 'Polish',
    pageCount: 393,
    price: 18.76,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'e1f96db2-1e3f-4423-a896-6e81b6619653'
  },
  {
    _id: '81af82d6-7cdb-4e14-b53f-4980832efaaf',
    title: 'Bangkok Dangerous',
    genres: ['Fiction', 'Travel', 'Dystopian'],
    publicationDate: '1/21/2017',
    publisher: 'Quaxo',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '915697777-8',
    language: 'Tajik',
    pageCount: 737,
    price: 45.87,
    format: ['Hardcover'],
    authorId: 'ad923796-1ad6-4a1d-88b6-454a04412573'
  },
  {
    _id: 'cb18b434-3e3d-4fa9-9d6b-3ef3fa37e91a',
    title: 'Beyond the Mat',
    genres: ['Health', 'History'],
    publicationDate: '2/7/1949',
    publisher: 'Oyope',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '503074372-3',
    language: 'Punjabi',
    pageCount: 182,
    price: 39.14,
    format: ['Paperback'],
    authorId: '9ffaabec-fe9e-4c5e-b81d-054b562d168b'
  },
  {
    _id: 'c6640c50-3bb2-420d-bd06-f016be397e4e',
    title: 'Promised Land',
    genres: ['Fiction', 'Self-help', 'Art', 'Memoir', 'Adventure'],
    publicationDate: '1/29/1996',
    publisher: 'Zoonder',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '433963813-7',
    language: 'Thai',
    pageCount: 141,
    price: 24.73,
    format: ['Paperback'],
    authorId: 'fc1068d1-310e-4fe3-8bb0-175e7010d66c'
  },
  {
    _id: '491a6cec-89e8-4d31-a94c-99760c8143b6',
    title: 'Soundbreaker ',
    genres: ['Thriller', 'Travel', 'Humor', 'Dystopian', 'Bildungsroman'],
    publicationDate: '6/1/1993',
    publisher: 'Skidoo',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '362530490-2',
    language: 'Burmese',
    pageCount: 358,
    price: 8.12,
    format: ['Paperback'],
    authorId: 'f857683b-28e8-4371-8103-bf6c32764777'
  },
  {
    _id: 'bb60a34d-bdc9-446f-9b9e-ba057208e04f',
    title: 'Lodger, The',
    genres: ['Fiction', 'Humor', 'Thriller', 'Dystopian'],
    publicationDate: '3/23/1921',
    publisher: 'Plambee',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '860506511-7',
    language: 'Ndebele',
    pageCount: 30,
    price: 34.69,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'f7ca40f3-7532-4e30-8294-033621c53d6e'
  },
  {
    _id: '79e2d5c2-12ea-4c76-b1d5-e57721e6064d',
    title: 'Stranger, The (Straniero, Lo)',
    genres: ['Families & Relationships', 'Science Fiction'],
    publicationDate: '6/16/1904',
    publisher: 'Gabcube',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '225107489-9',
    language: 'German',
    pageCount: 452,
    price: 27.56,
    format: ['E-Book', 'Hardcover'],
    authorId: '8603e557-730e-4ce0-8760-6fbcbbc45806'
  },
  {
    _id: '2128de40-de77-49b5-8ac0-68e48910c894',
    title: 'Shape of Things, The',
    genres: [
      'Adventure',
      'Bildungsroman',
      'Science Fiction',
      'Children’s',
      'Cookbook'
    ],
    publicationDate: '4/17/1900',
    publisher: 'Wordpedia',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '304546010-0',
    language: 'Pashto',
    pageCount: 629,
    price: 89.28,
    format: ['E-Book', 'Paperback'],
    authorId: '52c6e175-5bf4-4671-ac86-665e4dc54901'
  },
  {
    _id: 'fc7b8f84-e15f-43ae-a4eb-8fbf5d976dfc',
    title: 'Our Children (À perdre la raison)',
    genres: ['Fiction', 'Southern Gothic Fiction', 'Memoir', 'Gothic'],
    publicationDate: '11/23/1940',
    publisher: 'Meevee',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '281802791-8',
    language: 'Azeri',
    pageCount: 597,
    price: 71.02,
    format: ['E-Book', 'Hardcover'],
    authorId: '365bcc6b-db32-4883-bcc3-f9a62df58ce9'
  },
  {
    _id: 'd621bcfd-1f38-433b-bca2-84ebf12b32e9',
    title: 'Phantom of Liberty, The (Fantôme de la liberté, Le)',
    genres: ['Cookbook', 'Humor'],
    publicationDate: '4/22/1991',
    publisher: 'Vidoo',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '106713138-8',
    language: 'Tetum',
    pageCount: 479,
    price: 37.92,
    format: ['E-Book', 'Paperback'],
    authorId: 'de2ce351-11a6-4425-92d6-e51a7f546a7b'
  },
  {
    _id: '2125428e-f750-473b-9363-73550f31ab12',
    title: 'Master of the Flying Guillotine (Du bi quan wang da po xue di zi)',
    genres: ['Science Fiction'],
    publicationDate: '12/26/2019',
    publisher: 'Vinte',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '644431387-2',
    language: 'Marathi',
    pageCount: 456,
    price: 86.71,
    format: ['E-Book'],
    authorId: 'c041d756-40a0-4146-a219-bda3216a7615'
  },
  {
    _id: '2b9f5ebb-8fe2-448a-97ea-9667de9de76b',
    title: 'Shadow of a Doubt',
    genres: [
      'Southern Gothic Fiction',
      'Science Fiction',
      'Romance',
      'Bildungsroman'
    ],
    publicationDate: '6/24/1968',
    publisher: 'Divavu',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '687717888-2',
    language: 'Tswana',
    pageCount: 199,
    price: 98.26,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '49f8e20a-f433-45a9-b3ce-0106fda6bc3e'
  },
  {
    _id: 'cc040b93-3329-430a-a744-e7d673b35688',
    title: 'Along Came a Spider',
    genres: ['Historical fiction', 'Travel', 'Horror'],
    publicationDate: '5/25/1938',
    publisher: 'Eimbee',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '068122582-3',
    language: 'Georgian',
    pageCount: 584,
    price: 27.06,
    format: ['Hardcover'],
    authorId: 'e3cd6df6-103e-4108-bc96-e0d39bd0713f'
  },
  {
    _id: 'c1f2f228-08c6-4825-8acd-2ea077c9bbd9',
    title: 'Bananas!*',
    genres: ['Cookbook'],
    publicationDate: '2/3/1927',
    publisher: 'Eadel',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '888347561-5',
    language: 'Hiri Motu',
    pageCount: 287,
    price: 30.76,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '8c2a33f2-0222-454d-89d4-4b8b79071c49'
  },
  {
    _id: '15a97a67-504c-4e80-9d3c-c912c8a288aa',
    title: 'Man Made Monster',
    genres: [
      'Mystery',
      'Paranormal',
      'Families & Relationships',
      'Science Fiction'
    ],
    publicationDate: '12/29/1952',
    publisher: 'Thoughtsphere',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '736873582-2',
    language: 'Telugu',
    pageCount: 350,
    price: 98.5,
    format: ['Paperback'],
    authorId: '78c4acd0-25fa-47d6-ae89-9d2edb31bbbc'
  },
  {
    _id: '17d0168b-980e-409d-a81f-f169989291f7',
    title: 'Rusty Knife (Sabita naifu)',
    genres: ['History', 'Cookbook', 'Gothic', 'Memoir'],
    publicationDate: '3/26/1913',
    publisher: 'Zooxo',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '239731864-4',
    language: 'Hiri Motu',
    pageCount: 950,
    price: 44.29,
    format: ['E-Book'],
    authorId: '82a3acb2-dd18-4e47-818a-eaeb0e769b69'
  },
  {
    _id: 'be13b54f-5f85-427e-a527-d27a55cb51a9',
    title: 'Climb, The',
    genres: ['Cookbook', 'Guide / How-to'],
    publicationDate: '6/24/1934',
    publisher: 'Skidoo',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '782239574-2',
    language: 'Lao',
    pageCount: 395,
    price: 73.46,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'f61c8a0e-2c22-434f-93c8-13b06c9c9de5'
  },
  {
    _id: '72d62758-a5b6-4610-950a-99173b2f9732',
    title: 'Once a Thief (Zong heng si hai)',
    genres: ['Paranormal', 'History', 'Art', 'Horror', 'Adventure'],
    publicationDate: '7/11/1948',
    publisher: 'Vitz',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '387909226-5',
    language: 'Tamil',
    pageCount: 211,
    price: 20.78,
    format: ['Hardcover', 'Paperback'],
    authorId: '3d5cddce-4406-4073-9164-07910750ab76'
  },
  {
    _id: 'eb2d7ebb-8dd8-4271-9847-d7305f9d0814',
    title: 'The Car',
    genres: ['Travel', 'Families & Relationships'],
    publicationDate: '6/1/1998',
    publisher: 'Linkbuzz',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '539168875-2',
    language: 'Greek',
    pageCount: 250,
    price: 25.52,
    format: ['Hardcover'],
    authorId: '8a45e2c9-90a7-4873-a839-0a7f63f0d4e4'
  },
  {
    _id: '0afd30e8-b6c9-46be-b5d2-3c0678a989e3',
    title: 'The Message',
    genres: ['Children’s', 'Mystery', 'Adventure', 'Memoir'],
    publicationDate: '1/19/1916',
    publisher: 'Jaxspan',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '716575439-3',
    language: 'Romanian',
    pageCount: 43,
    price: 41.42,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'a7da4a33-75a6-4059-83a6-493c1117fce2'
  },
  {
    _id: '7835d7c8-b419-4c27-8d9b-7b4d2dee2ace',
    title: 'Stonewall Uprising',
    genres: ['Adventure', 'Thriller', 'Travel', 'Memoir'],
    publicationDate: '4/15/2011',
    publisher: 'Jaxspan',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '423383502-8',
    language: 'Hungarian',
    pageCount: 491,
    price: 23.63,
    format: ['E-Book', 'Paperback'],
    authorId: 'ef5783eb-eec4-4f35-af6d-4c3bfcc036ff'
  },
  {
    _id: '62fb9a0e-3b7d-4a55-ae3b-9e8439495e18',
    title: 'Man Who Left His Will on Film, The (Tôkyô sensô sengo hiwa)',
    genres: ['Children’s', 'Bildungsroman'],
    publicationDate: '3/6/1976',
    publisher: 'Nlounge',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '733315266-9',
    language: 'Dhivehi',
    pageCount: 329,
    price: 9.31,
    format: ['Paperback'],
    authorId: '2a35a7ce-6c7a-483c-9f82-4e437dfe82be'
  },
  {
    _id: '687449fe-4c23-451c-a9e2-00555372c580',
    title: 'Love, Wedding, Marriage',
    genres: [
      'Contemporary',
      'Families & Relationships',
      'Paranormal',
      'Fiction'
    ],
    publicationDate: '2/12/1987',
    publisher: 'Jaxspan',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '788739581-X',
    language: 'Kurdish',
    pageCount: 42,
    price: 16.66,
    format: ['Paperback'],
    authorId: 'd2198f3f-847e-413d-9775-c97e03a521d3'
  },
  {
    _id: '36b2ea1b-23fd-4a95-b86a-fd077abcfdff',
    title: 'Oak, The (Balanta)',
    genres: ['Cookbook'],
    publicationDate: '1/26/2001',
    publisher: 'Agivu',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '305277831-5',
    language: 'Japanese',
    pageCount: 266,
    price: 11.71,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'f36cd039-12da-4747-9bb8-ec8666fe62f3'
  },
  {
    _id: '35d5ca4a-6a9e-4e6d-97d9-11192160d91c',
    title: 'Eddy Duchin Story, The',
    genres: ['Horror', 'Historical fiction', 'Memoir', 'Travel'],
    publicationDate: '1/24/1912',
    publisher: 'Centidel',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '122011094-9',
    language: 'Telugu',
    pageCount: 934,
    price: 69.2,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '21cb65d1-3f24-4efd-be42-5169707738b4'
  },
  {
    _id: 'd0c82f48-3a95-4025-8341-bc573bbd635b',
    title: 'Yesterday Was a Lie',
    genres: ['Gothic', 'Science Fiction'],
    publicationDate: '6/25/1946',
    publisher: 'Thoughtsphere',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '537995584-3',
    language: 'Zulu',
    pageCount: 575,
    price: 68.03,
    format: ['Paperback'],
    authorId: '0c22558c-0ae9-43f4-ad7f-1ed7c3c39ee2'
  },
  {
    _id: 'cae8d37e-4d82-4558-8cd6-7e9a464d3c36',
    title: 'Murder by Proxy: How America Went Postal',
    genres: ['Humor'],
    publicationDate: '5/27/1905',
    publisher: 'Linkbuzz',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '756688774-2',
    language: 'Somali',
    pageCount: 317,
    price: 50.15,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '802d98db-0a9c-4539-8ad4-a6bc19385fb9'
  },
  {
    _id: '13bbc0aa-7067-486c-a973-755f4e98402b',
    title: 'Gervaise',
    genres: ['Paranormal', 'Bildungsroman', 'Contemporary'],
    publicationDate: '6/2/1912',
    publisher: 'Flashspan',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '329930466-6',
    language: 'Danish',
    pageCount: 982,
    price: 37.6,
    format: ['Paperback', 'E-Book'],
    authorId: '8b4128b2-cf2a-40e2-9130-9899c17853eb'
  },
  {
    _id: '7b8a1f89-4ac8-45de-bc6e-bcf8b5d30484',
    title: 'Disney Sing Along Songs: Under the Sea',
    genres: ['Health'],
    publicationDate: '8/15/1965',
    publisher: 'Tagpad',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '595012209-7',
    language: 'Guaraní',
    pageCount: 428,
    price: 57.91,
    format: ['E-Book', 'Paperback'],
    authorId: '56869ebf-d3b9-4356-95e2-4c3ca80cb191'
  },
  {
    _id: '72931a63-011f-4501-80b2-7525a5d35eef',
    title: 'Wanted',
    genres: ['Personal Development'],
    publicationDate: '7/22/2010',
    publisher: 'Photobean',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '371764228-6',
    language: 'Quechua',
    pageCount: 579,
    price: 76.73,
    format: ['Paperback'],
    authorId: '3627cb4e-dd06-4fca-8b53-5615d191a8b0'
  },
  {
    _id: '4338decb-f079-4c94-b1ca-69a58a408872',
    title: 'Survivors, The',
    genres: ['Paranormal', 'History'],
    publicationDate: '6/14/1900',
    publisher: 'Vinte',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '089531548-3',
    language: 'Dhivehi',
    pageCount: 504,
    price: 36.21,
    format: ['Paperback', 'E-Book'],
    authorId: 'c52ff6f2-cef7-44b0-b04f-d116108819c0'
  },
  {
    _id: 'f154ae81-ce36-47f0-a89c-03981ca44878',
    title: 'Unforgotten: Twenty-Five Years After Willowbrook',
    genres: ['Paranormal', 'Health', 'Personal Development'],
    publicationDate: '5/17/1904',
    publisher: 'Zazio',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '745381648-3',
    language: 'Norwegian',
    pageCount: 308,
    price: 71.03,
    format: ['E-Book', 'Paperback'],
    authorId: 'f4a50447-d8a4-4c16-88f8-95340704c772'
  },
  {
    _id: '1a4cf6d2-07b6-4ed9-9b44-2694e5f41c2a',
    title: 'Jim Jefferies: Fully Functional (EPIX)',
    genres: ['Thriller', 'Horror', 'Humor', 'Motivational'],
    publicationDate: '10/18/2022',
    publisher: 'Centizu',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '649079282-6',
    language: 'Gagauz',
    pageCount: 663,
    price: 44.28,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '0c6bb74d-5ba1-401f-a80a-373d09e8db8d'
  },
  {
    _id: 'dd594b3b-43a0-4a71-8e7e-8fdab17d8ad9',
    title: 'Norte, El',
    genres: [
      'Cookbook',
      'Historical fiction',
      'Self-help',
      'Contemporary',
      'Memoir'
    ],
    publicationDate: '6/24/1915',
    publisher: 'Brightbean',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '908322498-8',
    language: 'Malayalam',
    pageCount: 814,
    price: 48.56,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'd6caf59c-f74c-415a-a5c7-d80ecafd1c0b'
  },
  {
    _id: '4766ae27-b93c-4ef2-92da-5ab12cd539b8',
    title: "Li'l Quinquin",
    genres: [
      'Humor',
      'Families & Relationships',
      'Paranormal',
      'Personal Development'
    ],
    publicationDate: '1/24/1996',
    publisher: 'Lajo',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '763081919-6',
    language: 'Latvian',
    pageCount: 426,
    price: 63.25,
    format: ['E-Book', 'Paperback'],
    authorId: 'ef5783eb-eec4-4f35-af6d-4c3bfcc036ff'
  },
  {
    _id: 'ec5511ac-9f56-4310-a5e1-5ca8694885a5',
    title: "Big Momma's House",
    genres: [
      'Paranormal',
      'Children’s',
      'Families & Relationships',
      'Adventure'
    ],
    publicationDate: '9/30/2021',
    publisher: 'Plajo',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '614687603-8',
    language: 'Dutch',
    pageCount: 543,
    price: 54.9,
    format: ['Paperback'],
    authorId: '6a13b638-c3aa-483f-a242-1625cf76fe29'
  },
  {
    _id: '6daf356c-d087-419a-ade5-cda83412b4c7',
    title: 'Cast a Dark Shadow (Angel)',
    genres: ['Children’s', 'Contemporary'],
    publicationDate: '2/9/1988',
    publisher: 'Gabtune',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '193495218-4',
    language: 'Arabic',
    pageCount: 98,
    price: 74.91,
    format: ['Paperback'],
    authorId: '757e021b-a7e0-40e4-9e4f-3b944433f545'
  },
  {
    _id: '84634236-0abc-4956-8496-84b590e57634',
    title: 'Mighty Ducks, The',
    genres: ['Thriller', 'Southern Gothic Fiction', 'Travel'],
    publicationDate: '10/27/2001',
    publisher: 'Browsetype',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '583967083-9',
    language: 'Montenegrin',
    pageCount: 427,
    price: 49.71,
    format: ['Paperback'],
    authorId: '0bbf8a21-3237-4951-9035-efd68a0b05bd'
  },
  {
    _id: 'ed87310e-5cca-4b7f-a0f2-1c660a822bf1',
    title: 'Hush',
    genres: ['Mystery', 'Families & Relationships'],
    publicationDate: '1/10/1926',
    publisher: 'Thoughtworks',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '327293470-7',
    language: 'Tok Pisin',
    pageCount: 619,
    price: 62.07,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '935e284a-3232-49e2-a619-a4ebcff82601'
  },
  {
    _id: '5a482edc-1f56-4ad1-8ded-390712545f04',
    title: 'Illegal',
    genres: [
      'Horror',
      'Art',
      'Southern Gothic Fiction',
      'Adventure',
      'Bildungsroman'
    ],
    publicationDate: '12/3/1963',
    publisher: 'Blogtag',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '731521627-8',
    language: 'Papiamento',
    pageCount: 137,
    price: 29.22,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '6c17ed87-adc0-4b74-a785-4cf52b7a5a6d'
  },
  {
    _id: 'fb5567d5-5957-413f-931e-eedd075cb1e9',
    title: 'Beyond (Svinalängorna)',
    genres: ['Health', 'Dystopian', 'Paranormal'],
    publicationDate: '9/25/1966',
    publisher: 'Buzzbean',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '776096155-3',
    language: 'Albanian',
    pageCount: 571,
    price: 44.46,
    format: ['Paperback'],
    authorId: '0b5c7c70-f14f-4ee2-ab72-bcfc0281c97f'
  },
  {
    _id: '9e3924e1-6e0a-4938-8bc0-bb9426778d81',
    title: 'Roman',
    genres: ['Horror'],
    publicationDate: '5/30/1926',
    publisher: 'Devpoint',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '156285287-6',
    language: 'Montenegrin',
    pageCount: 255,
    price: 83.33,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'e28d16d0-eba7-45cb-96a0-15520fafd03c'
  },
  {
    _id: '7bd9e62c-69e0-402f-a5c8-062ec2496115',
    title: 'Bringing Up Baby',
    genres: ['Paranormal'],
    publicationDate: '5/29/2005',
    publisher: 'Abata',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '550113615-5',
    language: 'Catalan',
    pageCount: 951,
    price: 47.2,
    format: ['Hardcover'],
    authorId: '859b661c-1761-42bc-87e3-93ed892a1dd8'
  },
  {
    _id: '5188d1cd-1989-4e7a-a3c0-4a588a812659',
    title: 'Space Chimps',
    genres: [
      'Families & Relationships',
      'Southern Gothic Fiction',
      'Personal Development',
      'Horror'
    ],
    publicationDate: '11/8/1920',
    publisher: 'Fatz',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '054629112-0',
    language: 'Dzongkha',
    pageCount: 939,
    price: 7.41,
    format: ['Hardcover'],
    authorId: 'e465ba22-78a0-473a-aa6e-4dc28a031fbf'
  },
  {
    _id: '60d20fc7-df97-44b7-ae8e-4c8928694c70',
    title: 'Debt, The (Dlug)',
    genres: [
      'Science Fiction',
      'Cookbook',
      'Bildungsroman',
      'Memoir',
      'Historical fiction'
    ],
    publicationDate: '5/7/1971',
    publisher: 'Meedoo',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '180232173-X',
    language: 'Japanese',
    pageCount: 561,
    price: 48.85,
    format: ['E-Book'],
    authorId: 'c12eb14f-1e38-4ed2-a200-2900f7b6ccad'
  },
  {
    _id: '6174a63e-ac49-44cc-9236-4610915f44e9',
    title: 'I Think I Do',
    genres: ['Travel', 'Thriller', 'Southern Gothic Fiction', 'Health'],
    publicationDate: '4/25/1995',
    publisher: 'Twimbo',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '690071846-9',
    language: 'Kashmiri',
    pageCount: 495,
    price: 23.17,
    format: ['Paperback', 'E-Book'],
    authorId: 'a02c43f3-0026-4e74-bed7-1802d54daa2b'
  },
  {
    _id: '54510583-d436-41d1-9b09-56a4535647fa',
    title: 'Post Grad',
    genres: ['Historical fiction', 'Southern Gothic Fiction'],
    publicationDate: '12/30/1950',
    publisher: 'Thoughtmix',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '141739190-1',
    language: 'Khmer',
    pageCount: 689,
    price: 13.44,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '9d71c305-43e5-465f-85ff-17e5b45fb72e'
  },
  {
    _id: '0e2ad70a-4c0d-472b-8351-0eb88e414098',
    title: 'Dreamcatcher',
    genres: ['Fiction', 'Science Fiction'],
    publicationDate: '4/24/1993',
    publisher: 'Jabbersphere',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '195353351-5',
    language: 'Swati',
    pageCount: 854,
    price: 85.08,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'b2a68b98-ebf6-4259-ba4f-a95df6fcd8c2'
  },
  {
    _id: 'b3a2ad92-d953-415a-b5dc-44a3dac11548',
    title: 'Smurfs, The',
    genres: [
      'Motivational',
      'Families & Relationships',
      'Memoir',
      'Humor',
      'Thriller'
    ],
    publicationDate: '2/3/1936',
    publisher: 'Zooxo',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '347355662-9',
    language: 'Hungarian',
    pageCount: 722,
    price: 77.35,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '811e02d4-f4d5-4b14-8a89-04af4c5df108'
  },
  {
    _id: '17e2a20f-0a61-4e90-bed1-232aee1591a1',
    title: 'Bullets or Ballots',
    genres: ['Contemporary', 'Gothic', 'Science Fiction', 'Fiction'],
    publicationDate: '10/9/1986',
    publisher: 'Gabcube',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '957730297-1',
    language: 'Finnish',
    pageCount: 532,
    price: 84.79,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '9d71c305-43e5-465f-85ff-17e5b45fb72e'
  },
  {
    _id: '8ef79222-ea8f-4771-b4b7-99621e29b614',
    title: 'Armageddon 2012',
    genres: ['Humor', 'Health', 'Mystery'],
    publicationDate: '7/1/1905',
    publisher: 'Ntag',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '825125657-7',
    language: 'Oriya',
    pageCount: 471,
    price: 43.51,
    format: ['Paperback'],
    authorId: 'cdf048ac-6874-45e9-8a93-2f561c22ed4e'
  },
  {
    _id: '0da9e366-381e-47a1-b597-9df4c91ea5f0',
    title: 'Egg and I, The',
    genres: ['Dystopian'],
    publicationDate: '9/6/1907',
    publisher: 'Abata',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '967182561-3',
    language: 'Marathi',
    pageCount: 859,
    price: 53.62,
    format: ['Paperback'],
    authorId: '2579080f-eb74-4ed3-8167-2e376841407c'
  },
  {
    _id: '3614e939-52e9-4eed-b3fc-58f407dd81b7',
    title: 'Titanica',
    genres: ['Memoir'],
    publicationDate: '10/22/1928',
    publisher: 'Skimia',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '853071269-2',
    language: 'Māori',
    pageCount: 235,
    price: 13.28,
    format: ['Paperback', 'E-Book'],
    authorId: 'e8fcb35b-2d2d-4af8-8766-11bc06e63a69'
  },
  {
    _id: 'b102471c-7195-4030-ae7b-354ec1c0a55e',
    title: 'Persona non grata',
    genres: ['Contemporary'],
    publicationDate: '1/26/1933',
    publisher: 'Yotz',
    summary: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '882567687-5',
    language: 'Persian',
    pageCount: 660,
    price: 60.74,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'cd241b6d-6c8b-4827-b2bd-979f238e8e5d'
  },
  {
    _id: 'e770b654-c4fb-44cf-8269-c1a1c1c7aed0',
    title: 'Divine Horsemen: The Living Gods of Haiti',
    genres: ['Adventure', 'Southern Gothic Fiction'],
    publicationDate: '10/23/1939',
    publisher: 'Browseblab',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '185018732-0',
    language: 'Bengali',
    pageCount: 383,
    price: 96.81,
    format: ['Paperback'],
    authorId: '11d8a604-6039-4287-ad62-4a1359cb9929'
  },
  {
    _id: '9102a956-496b-452e-b94a-63d8a6092453',
    title: 'Stop at Nothing: The Lance Armstrong Story',
    genres: ['Self-help'],
    publicationDate: '5/31/1932',
    publisher: 'Twitternation',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '788934257-8',
    language: 'Assamese',
    pageCount: 417,
    price: 96.88,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '8292872d-dad4-490c-ba30-7459f647d2ba'
  },
  {
    _id: '575a4941-9c24-42fb-9c9e-4ae4ef6b268c',
    title: 'Until the Light Takes Us',
    genres: [
      'Mystery',
      'Families & Relationships',
      'Personal Development',
      'Southern Gothic Fiction'
    ],
    publicationDate: '10/30/1950',
    publisher: 'Edgetag',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '966143321-6',
    language: 'Tok Pisin',
    pageCount: 324,
    price: 37.86,
    format: ['Hardcover', 'E-Book'],
    authorId: '36e99f18-8791-4349-a745-8e17467665cf'
  },
  {
    _id: '1896d1f2-01bb-491c-8c00-74ce81806452',
    title: "Jumbo (Billy Rose's Jumbo)",
    genres: ['Humor', 'Historical fiction'],
    publicationDate: '2/7/2021',
    publisher: 'Mudo',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '925111126-X',
    language: 'Dari',
    pageCount: 392,
    price: 44.38,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '21d34ada-c6e8-4b30-a25e-399eacb27ef9'
  },
  {
    _id: 'dffe6e70-2f34-4e46-8e09-16c279a62d2e',
    title: 'Method to the Madness of Jerry Lewis',
    genres: ['Adventure', 'Art'],
    publicationDate: '7/26/1918',
    publisher: 'Kare',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '781545155-1',
    language: 'Assamese',
    pageCount: 620,
    price: 92.15,
    format: ['Paperback'],
    authorId: '948987d5-13ce-4725-988b-105c05ece819'
  },
  {
    _id: '2eb84e6e-903e-409f-adb1-376b10771644',
    title: 'Resurrected, The',
    genres: ['Fiction'],
    publicationDate: '6/9/1917',
    publisher: 'Zoonder',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '475095608-2',
    language: 'Hungarian',
    pageCount: 466,
    price: 94.8,
    format: ['E-Book'],
    authorId: 'ba0095b7-6e65-43cd-939a-4d60d76c10df'
  },
  {
    _id: '9323dd71-952d-47eb-851e-098049b81e13',
    title: 'Extreme Days',
    genres: ['Thriller', 'Horror', 'Paranormal', 'Health'],
    publicationDate: '12/2/2009',
    publisher: 'Brainverse',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '440338095-6',
    language: 'Catalan',
    pageCount: 407,
    price: 77.41,
    format: ['E-Book', 'Paperback'],
    authorId: '2f384f94-3958-4894-a2d3-5eaa1a8ee8f3'
  },
  {
    _id: 'e4c55890-4b09-491d-971e-a379aa331b38',
    title: 'And So It Goes',
    genres: ['Contemporary', 'Children’s', 'Personal Development', 'Thriller'],
    publicationDate: '12/13/1965',
    publisher: 'Oyondu',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '289174804-2',
    language: 'Lithuanian',
    pageCount: 276,
    price: 62.23,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'e920d89e-b303-4d4e-b4a5-6d7a4dd920f2'
  },
  {
    _id: '4ab0787d-b058-49de-9a5d-4d702d7eb445',
    title: 'Scarlet Diva',
    genres: ['Personal Development', 'Self-help', 'Thriller', 'Health'],
    publicationDate: '3/8/1995',
    publisher: 'Mudo',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '974290450-2',
    language: 'French',
    pageCount: 356,
    price: 19.95,
    format: ['Hardcover'],
    authorId: '21d34ada-c6e8-4b30-a25e-399eacb27ef9'
  },
  {
    _id: 'bf4ab8e9-118d-49af-83d8-55e4e8835d62',
    title: 'Jim Gaffigan: Mr. Universe',
    genres: ['Art', 'Gothic', 'Fiction', 'Southern Gothic Fiction'],
    publicationDate: '10/21/1951',
    publisher: 'Browsezoom',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '647262767-3',
    language: 'Nepali',
    pageCount: 603,
    price: 22.98,
    format: ['E-Book', 'Paperback'],
    authorId: '44146811-c29c-44a3-a186-010f7b5d9376'
  },
  {
    _id: 'ce1ee860-147b-4851-b187-ce8f81789bcd',
    title: 'Roman de gare',
    genres: ['Dystopian'],
    publicationDate: '2/10/1991',
    publisher: 'Flipstorm',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '315145078-4',
    language: 'Zulu',
    pageCount: 282,
    price: 13.21,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '434e8f61-3e3a-4c8a-85fc-1224950998b7'
  },
  {
    _id: '810e8968-a629-4bb8-962a-8be842f9167a',
    title: 'Soupe aux Choux, La',
    genres: [
      'Personal Development',
      'Guide / How-to',
      'Mystery',
      'Science Fiction'
    ],
    publicationDate: '12/13/1940',
    publisher: 'Wikizz',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '671313785-7',
    language: 'Malay',
    pageCount: 170,
    price: 48.51,
    format: ['Paperback', 'Hardcover'],
    authorId: '263690c4-e415-456f-a69f-ea78a8d22474'
  },
  {
    _id: 'f0702c9e-aaf7-49aa-ac08-de9227ba07c8',
    title: 'Extraterrestrial',
    genres: ['Gothic', 'Art', 'Health'],
    publicationDate: '9/6/2018',
    publisher: 'Centizu',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '275003805-7',
    language: 'Khmer',
    pageCount: 382,
    price: 64.97,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '375ea9be-3e7e-4d00-a01c-b0a3a0148be6'
  },
  {
    _id: 'e2b7a3a2-e4f6-4a6e-bfc8-da41d3409265',
    title: '[REC]',
    genres: ['Horror', 'Humor'],
    publicationDate: '2/1/1999',
    publisher: 'Thoughtstorm',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '363929097-6',
    language: 'Irish Gaelic',
    pageCount: 389,
    price: 10.07,
    format: ['Hardcover', 'E-Book'],
    authorId: '569d368d-46ef-43d9-aada-b17e655a509f'
  },
  {
    _id: '1ac7be25-51ef-472c-82dc-322ccea7495c',
    title: 'Letter from Siberia',
    genres: ['Self-help', 'Romance', 'Gothic', 'Bildungsroman', 'Mystery'],
    publicationDate: '5/30/2012',
    publisher: 'Linktype',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '986615463-7',
    language: 'Telugu',
    pageCount: 372,
    price: 66.09,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '4de7f77b-dad4-4c05-af13-24f2b1dd4914'
  },
  {
    _id: '110d7f09-db00-476e-a417-568beb52ce6e',
    title: 'Belles on Their Toes',
    genres: ['Cookbook', 'Contemporary'],
    publicationDate: '5/4/1930',
    publisher: 'Katz',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '262755968-0',
    language: 'Haitian Creole',
    pageCount: 892,
    price: 26.67,
    format: ['Paperback', 'E-Book'],
    authorId: 'e6c1ab2a-0a17-4f6b-ae2c-397fc0373c33'
  },
  {
    _id: '033924b7-3c2a-449d-8683-a693dc93957f',
    title: 'I Spit on Your Grave 2 ',
    genres: ['Mystery'],
    publicationDate: '5/23/1904',
    publisher: 'Centimia',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '222069808-4',
    language: 'Yiddish',
    pageCount: 617,
    price: 33.23,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '6c9ab84b-60f8-4bce-9675-07767d6573a0'
  },
  {
    _id: 'afb6ebf5-fc43-4389-aec9-fed650aa2218',
    title: 'Throw Away Your Books, Rally in the Streets',
    genres: ['Travel', 'Self-help', 'Contemporary', 'Motivational'],
    publicationDate: '3/4/1921',
    publisher: 'Riffpedia',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '581036122-6',
    language: 'Dari',
    pageCount: 673,
    price: 32.19,
    format: ['Paperback'],
    authorId: '9c605d7e-5ca6-4796-9626-f406685f54b1'
  },
  {
    _id: 'f6e8ff0b-8533-483f-8dc0-be8c4d4b86f1',
    title: 'Last Letter, The (La dernière lettre)',
    genres: ['Paranormal'],
    publicationDate: '8/10/1964',
    publisher: 'Jetpulse',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '192365173-0',
    language: 'Georgian',
    pageCount: 939,
    price: 12.04,
    format: ['Paperback', 'E-Book'],
    authorId: 'ce9d7482-72d1-4067-9212-62516c7d139b'
  },
  {
    _id: '5b685de8-2539-44cc-9b27-21ba7dc7318c',
    title: 'Tales of Ordinary Madness (Storie di Ordinaria Follia)',
    genres: ['Paranormal', 'Guide / How-to'],
    publicationDate: '8/27/2013',
    publisher: 'Gabvine',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '850130975-3',
    language: 'Aymara',
    pageCount: 191,
    price: 7.97,
    format: ['E-Book', 'Paperback'],
    authorId: '8db08c4b-7983-4518-9a33-bef0994d925d'
  },
  {
    _id: '76bf3af3-6c2b-429a-804e-85678d30cd31',
    title: "Turn Left at the End of the World (Sof Ha'Olam Smola)",
    genres: ['Science Fiction', 'Self-help', 'Historical fiction'],
    publicationDate: '7/20/1954',
    publisher: 'Omba',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '293541747-X',
    language: 'Kashmiri',
    pageCount: 668,
    price: 59.37,
    format: ['Paperback', 'E-Book'],
    authorId: '6ab3212d-2186-412c-895f-98fa05b23290'
  },
  {
    _id: '7b60bea1-08b4-456e-ad05-e734b572d6a3',
    title: 'Man Exposed',
    genres: ['Humor', 'Historical fiction', 'Fiction', 'Paranormal', 'Art'],
    publicationDate: '8/26/1907',
    publisher: 'Jabbersphere',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '141786183-5',
    language: 'Montenegrin',
    pageCount: 904,
    price: 18.37,
    format: ['Hardcover', 'Paperback'],
    authorId: 'cb503a3f-1b42-425c-bceb-93014711f259'
  },
  {
    _id: '10d945d9-3fc0-4b3a-a13f-8de8a7e9a8d1',
    title: 'Road to Brown, The',
    genres: ['Fiction'],
    publicationDate: '4/18/1960',
    publisher: 'Vinder',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '180591625-4',
    language: 'Malagasy',
    pageCount: 195,
    price: 89.55,
    format: ['Paperback'],
    authorId: 'b1fa1dd5-1ac3-4812-86e7-394b18e8bb7c'
  },
  {
    _id: 'b5c4c035-0d3c-4269-9136-81e7c80d0413',
    title: 'Come to the Stable',
    genres: ['Cookbook', 'History', 'Science Fiction', 'Humor'],
    publicationDate: '11/18/1964',
    publisher: 'Abatz',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '958875472-0',
    language: 'Swedish',
    pageCount: 855,
    price: 72.37,
    format: ['Paperback', 'Hardcover'],
    authorId: 'cc50469f-6265-44ba-99be-2e27b4b60a4b'
  },
  {
    _id: 'cfbb02cb-b8f1-4fd2-bb79-91890aca2cb0',
    title: 'Cookout, The',
    genres: ['Mystery', 'Children’s', 'Gothic', 'Art'],
    publicationDate: '6/17/2017',
    publisher: 'Livepath',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '116700429-9',
    language: 'New Zealand Sign Language',
    pageCount: 678,
    price: 20.22,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'bbb3f25b-597e-42cf-adcd-4b6f04c9373d'
  },
  {
    _id: 'd1dd8faf-9444-48ae-b2f0-5300b9bc1692',
    title: 'Front Line, The (Go-ji-jeon)',
    genres: ['Fiction', 'Dystopian', 'Horror'],
    publicationDate: '6/22/1944',
    publisher: 'Brainlounge',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '639046592-0',
    language: 'Azeri',
    pageCount: 628,
    price: 54.69,
    format: ['Paperback'],
    authorId: 'cb503a3f-1b42-425c-bceb-93014711f259'
  },
  {
    _id: '4c3ab4ea-a8ea-40dd-babf-5da852ac9e81',
    title: 'Art of War II: Betrayal, The',
    genres: ['Children’s', 'Paranormal', 'Bildungsroman', 'Fiction'],
    publicationDate: '10/21/2010',
    publisher: 'Npath',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '957915898-3',
    language: 'Tamil',
    pageCount: 329,
    price: 45.08,
    format: ['Hardcover'],
    authorId: '47ac3341-6d18-46ba-afc8-596f10030bd3'
  },
  {
    _id: '90c63a0b-c366-4d32-b471-6590b645e547',
    title: 'Cooking with Stella',
    genres: ['Travel', 'Motivational'],
    publicationDate: '12/28/1907',
    publisher: 'Trunyx',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '531770896-6',
    language: 'Northern Sotho',
    pageCount: 725,
    price: 55.65,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '6f4b066f-ca50-4ca9-9dd2-5f8ab9c75550'
  },
  {
    _id: '7dbcc445-9bf8-47cd-9fae-a25074ad0049',
    title: 'Rush: Beyond the Lighted Stage',
    genres: ['Paranormal'],
    publicationDate: '7/9/1954',
    publisher: 'Ainyx',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '491504848-9',
    language: 'Yiddish',
    pageCount: 253,
    price: 74.41,
    format: ['Paperback'],
    authorId: '882dae67-dbf4-442a-9efd-2175c140f0f0'
  },
  {
    _id: '7cacaf68-c040-42e1-aa7b-169b27517c00',
    title: 'Flame and Women (Honô to onna) ',
    genres: ['Mystery', 'Memoir', 'Thriller', 'Contemporary', 'Motivational'],
    publicationDate: '2/2/1947',
    publisher: 'Shuffletag',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '695526546-6',
    language: 'Estonian',
    pageCount: 674,
    price: 88.43,
    format: ['Paperback', 'E-Book'],
    authorId: '4fe93412-443f-4dd8-97d4-4e46170bda3b'
  },
  {
    _id: '0bcc008b-1848-4285-bc82-18e32dc50f4c',
    title: 'Reel Bad Arabs: How Hollywood Vilifies a People',
    genres: ['Memoir', 'Travel', 'Southern Gothic Fiction'],
    publicationDate: '2/11/2003',
    publisher: 'Jamia',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '659257593-X',
    language: 'Danish',
    pageCount: 918,
    price: 58.43,
    format: ['Hardcover'],
    authorId: '6a13b638-c3aa-483f-a242-1625cf76fe29'
  },
  {
    _id: '1128f2bf-4de3-4879-861b-123883846018',
    title: 'Millie',
    genres: ['Contemporary'],
    publicationDate: '6/7/1960',
    publisher: 'Buzzbean',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '260724399-8',
    language: 'Greek',
    pageCount: 348,
    price: 35.44,
    format: ['Paperback', 'Hardcover'],
    authorId: 'ed35bc3b-f204-4cd1-bc34-ad364e06fc39'
  },
  {
    _id: '28c9a6b1-2ae2-4811-b15f-dd78b63b9033',
    title: 'Judy Moody and the Not Bummer Summer',
    genres: ['Art', 'Cookbook'],
    publicationDate: '10/9/2008',
    publisher: 'Snaptags',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '347145028-9',
    language: 'Georgian',
    pageCount: 576,
    price: 15.38,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '60456bcb-a2b8-405f-8245-69e4b17a183e'
  },
  {
    _id: '40d5ef80-d719-4053-9ea7-302ae8c5b9f3',
    title: 'Shakes the Clown',
    genres: ['Adventure', 'Bildungsroman', 'Thriller', 'Cookbook'],
    publicationDate: '5/8/1992',
    publisher: 'Zoomlounge',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '078134002-0',
    language: 'Gujarati',
    pageCount: 5,
    price: 15.65,
    format: ['Paperback'],
    authorId: '3dad07d6-9ca7-498e-a4b7-f9565dd54367'
  },
  {
    _id: '2475a215-b819-47aa-95a7-9acc3752099c',
    title: 'Rabbit-Proof Fence',
    genres: ['Science Fiction', 'Fiction'],
    publicationDate: '1/28/2006',
    publisher: 'Kwinu',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '270817624-2',
    language: 'Northern Sotho',
    pageCount: 594,
    price: 58.81,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'c6b583b0-8011-496d-a23b-8d6e62d43a38'
  },
  {
    _id: 'f2c3e6f5-c4c8-436a-b7c6-8309708bb9f1',
    title: 'Tart',
    genres: ['Art', 'Memoir', 'Self-help', 'Travel', 'Paranormal'],
    publicationDate: '9/24/1972',
    publisher: 'Jabbercube',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '485749908-8',
    language: 'Moldovan',
    pageCount: 644,
    price: 47.59,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'a4946a28-af9a-4278-841f-cda842dcf4e2'
  },
  {
    _id: '655e6dcd-9b19-473c-a62c-ca3ead8c0664',
    title: 'Paid',
    genres: ['Motivational', 'Children’s', 'Self-help'],
    publicationDate: '12/27/1924',
    publisher: 'Eayo',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '792420103-3',
    language: 'Māori',
    pageCount: 569,
    price: 30.52,
    format: ['E-Book'],
    authorId: '04e3a9e3-49dd-476b-a7f4-5f2c6f77b040'
  },
  {
    _id: '428055e0-e909-4189-b3d4-ed05db5866c6',
    title: 'Mighty Quinn, The',
    genres: ['Art'],
    publicationDate: '5/23/1963',
    publisher: 'Twitternation',
    summary:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '245278622-5',
    language: 'Kyrgyz',
    pageCount: 239,
    price: 99.03,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '3d5cddce-4406-4073-9164-07910750ab76'
  },
  {
    _id: 'ef0c4e81-cd85-48ee-82b8-fe0afe8e50fd',
    title: 'Orgy of the Dead',
    genres: ['Humor'],
    publicationDate: '3/16/1910',
    publisher: 'Chatterpoint',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '723291902-6',
    language: 'Swedish',
    pageCount: 255,
    price: 71.62,
    format: ['E-Book', 'Paperback'],
    authorId: '170e2509-cc12-461b-997e-cae0e1e1fc79'
  },
  {
    _id: '82461005-273a-4a9e-b00e-8d7e9bae023a',
    title: 'Kid With a Bike, The (Le gamin au vélo)',
    genres: [
      'Romance',
      'Contemporary',
      'Cookbook',
      'Horror',
      'Historical fiction'
    ],
    publicationDate: '3/23/1984',
    publisher: 'Roomm',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    isbn: '174986749-4',
    language: 'Swahili',
    pageCount: 839,
    price: 12.82,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '2fc320d8-c1ba-477f-b6e9-5c3c23efbf0a'
  },
  {
    _id: '0ed8172f-88c8-4dd1-893d-b164b63964b8',
    title: 'Blablablá',
    genres: ['Gothic', 'Horror', 'History', 'Humor'],
    publicationDate: '10/21/1943',
    publisher: 'Realpoint',
    summary: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '786077721-5',
    language: 'Norwegian',
    pageCount: 662,
    price: 34.33,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'bae5536c-ae91-477f-a7eb-bcd11873baaf'
  },
  {
    _id: 'fd928e54-02a8-4534-91c4-cf67d8822f5c',
    title: 'Savannah Smiles',
    genres: ['Paranormal', 'Travel', 'Motivational'],
    publicationDate: '1/22/2013',
    publisher: 'Oyope',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '598905522-6',
    language: 'Arabic',
    pageCount: 825,
    price: 22.86,
    format: ['Hardcover', 'E-Book'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: 'a489f5fb-9f6c-4b6a-8eaa-3a3c8a805525',
    title:
      "Night They Raided Minsky's, The (Night They Invented Striptease, The)",
    genres: ['Art', 'History', 'Gothic', 'Memoir', 'Dystopian'],
    publicationDate: '7/24/1919',
    publisher: 'Quinu',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '922097290-5',
    language: 'Punjabi',
    pageCount: 829,
    price: 72.29,
    format: ['Hardcover', 'Paperback'],
    authorId: '52c6e175-5bf4-4671-ac86-665e4dc54901'
  },
  {
    _id: '6e5ec7a5-5914-4cbf-bb94-0ed723e7de2d',
    title: 'Mannequin',
    genres: ['Science Fiction', 'Travel'],
    publicationDate: '9/22/1904',
    publisher: 'Livefish',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '946443520-8',
    language: 'Latvian',
    pageCount: 511,
    price: 48.02,
    format: ['Paperback', 'Hardcover'],
    authorId: '954b477c-4d10-42b1-96c9-59dbedbf4c54'
  },
  {
    _id: 'aad4207c-3eaf-4d51-b509-8d514a3a8802',
    title: 'Stranger than Fiction',
    genres: ['History', 'Self-help', 'Travel', 'Health', 'Bildungsroman'],
    publicationDate: '7/1/1992',
    publisher: 'Camido',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '464497392-0',
    language: 'Sotho',
    pageCount: 170,
    price: 73.88,
    format: ['Paperback'],
    authorId: 'f8ebaa16-3a02-4cb7-8710-2f4839d32590'
  },
  {
    _id: 'ea2f9418-7968-46e6-9df0-27f083965f96',
    title: 'War Game, The',
    genres: ['Humor', 'Self-help'],
    publicationDate: '8/3/2012',
    publisher: 'Zoomlounge',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '296667554-3',
    language: 'Portuguese',
    pageCount: 437,
    price: 31.69,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '263690c4-e415-456f-a69f-ea78a8d22474'
  },
  {
    _id: '24eb2bee-fc3e-44d0-9f52-00f2172c3534',
    title: 'Antonio Gaudí',
    genres: [
      'Contemporary',
      'Families & Relationships',
      'Adventure',
      'Personal Development',
      'Cookbook'
    ],
    publicationDate: '11/2/1985',
    publisher: 'Skalith',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '728514983-7',
    language: 'Finnish',
    pageCount: 307,
    price: 66.11,
    format: ['Paperback'],
    authorId: 'e55d71ed-c99c-4e2d-80f9-8f4633a8e635'
  },
  {
    _id: 'cbb27c50-4763-45a3-8bee-4b0dce334b31',
    title: 'Perfect Storm, The',
    genres: ['Paranormal', 'Motivational', 'Guide / How-to'],
    publicationDate: '2/28/1928',
    publisher: 'Dynabox',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '969860807-9',
    language: 'Danish',
    pageCount: 792,
    price: 99.38,
    format: ['E-Book'],
    authorId: 'a122a3ba-36c2-48d1-9014-83cd41e17953'
  },
  {
    _id: '0c1c0aba-7f97-486f-8188-f4dfcb3bac32',
    title: 'Toolbox Murders',
    genres: ['Dystopian', 'Children’s', 'Memoir'],
    publicationDate: '3/12/1990',
    publisher: 'Fanoodle',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '409489114-5',
    language: 'Aymara',
    pageCount: 720,
    price: 64.52,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '9c8568f1-4fdc-410d-b0ad-eff71ced0abe'
  },
  {
    _id: '7c591444-03b3-4a34-8994-cc93490beb00',
    title: 'Curse of the Werewolf, The',
    genres: ['Personal Development', 'Health', 'Motivational'],
    publicationDate: '10/8/1938',
    publisher: 'Wordware',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '223828413-3',
    language: 'Swati',
    pageCount: 488,
    price: 8.34,
    format: ['Paperback'],
    authorId: 'cc37f78d-b034-4e43-8add-42055c477612'
  },
  {
    _id: 'af8bedf5-34a8-4099-9b37-efcc48644a51',
    title: 'Sting II, The',
    genres: ['Health', 'History', 'Humor', 'Dystopian', 'Bildungsroman'],
    publicationDate: '5/21/1975',
    publisher: 'Jazzy',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '869958169-6',
    language: 'Amharic',
    pageCount: 987,
    price: 21.08,
    format: ['Paperback', 'Hardcover'],
    authorId: '96d8604e-0e99-4bd1-bcc6-1a0800b317c2'
  },
  {
    _id: '8ec61ffa-9219-4321-8f96-5511e5c857d6',
    title: "Mockingbird Don't Sing",
    genres: ['Gothic', 'Mystery'],
    publicationDate: '2/25/1978',
    publisher: 'Blognation',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '588916945-9',
    language: 'New Zealand Sign Language',
    pageCount: 922,
    price: 25.19,
    format: ['E-Book'],
    authorId: 'dcc3ecde-e73e-438f-8753-64a6508b9f90'
  },
  {
    _id: 'd3d293ff-af69-427c-842a-e5632293cedd',
    title: 'Short Sharp Shock (Kurz und schmerzlos) ',
    genres: ['Memoir', 'Self-help', 'Contemporary', 'Thriller', 'Fiction'],
    publicationDate: '9/8/1986',
    publisher: 'Realbuzz',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '744863410-0',
    language: 'Ndebele',
    pageCount: 546,
    price: 71.13,
    format: ['E-Book'],
    authorId: 'f44f7f78-2326-465b-8abe-9724da08ac22'
  },
  {
    _id: 'a6f03769-7030-4809-a11a-032719194968',
    title: 'Last Summer in the Hamptons',
    genres: ['Horror', 'Families & Relationships'],
    publicationDate: '3/24/1991',
    publisher: 'Zazio',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '770581243-6',
    language: 'Danish',
    pageCount: 230,
    price: 86.74,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'ba651cf2-8c94-459f-96f6-6a44aa62eb6f'
  },
  {
    _id: 'a592a4b9-45a3-4f01-87bb-32d1848474a4',
    title: 'Das Experiment (Experiment, The)',
    genres: ['Children’s', 'Guide / How-to', 'Self-help'],
    publicationDate: '6/30/2020',
    publisher: 'Mudo',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '387966578-8',
    language: 'West Frisian',
    pageCount: 284,
    price: 79.28,
    format: ['Hardcover', 'Paperback'],
    authorId: '20ed03f8-2c9b-4175-9596-871a532b8560'
  },
  {
    _id: '1095f0cf-77cf-49b9-903a-68bbc421969a',
    title: 'Amreeka',
    genres: ['Self-help', 'Romance'],
    publicationDate: '1/1/1925',
    publisher: 'Quatz',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '274934651-7',
    language: 'Hindi',
    pageCount: 970,
    price: 25.42,
    format: ['Paperback', 'E-Book'],
    authorId: '23e80b21-2fd0-4a4e-9397-f578a8c0a057'
  },
  {
    _id: 'dc349836-f560-4c42-b2a3-bc90ca40a65f',
    title: 'Aziz Ansari: Buried Alive',
    genres: ['Art'],
    publicationDate: '5/22/1941',
    publisher: 'Realbuzz',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '282095448-0',
    language: 'Tamil',
    pageCount: 511,
    price: 51.55,
    format: ['Paperback'],
    authorId: '8292872d-dad4-490c-ba30-7459f647d2ba'
  },
  {
    _id: 'b3a1d525-5348-45db-af49-c08e01b06b88',
    title: 'Lady Vanishes, The',
    genres: ['Self-help'],
    publicationDate: '9/19/1916',
    publisher: 'Wordware',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '513084686-9',
    language: 'Bengali',
    pageCount: 243,
    price: 11.44,
    format: ['Hardcover', 'Paperback'],
    authorId: '44661fef-082d-421f-b2c0-b6bc3698d4f5'
  },
  {
    _id: 'ee8fcace-5ae7-4fbd-bbe8-997e90449d59',
    title: 'Leo the Last',
    genres: ['Memoir', 'Families & Relationships', 'Southern Gothic Fiction'],
    publicationDate: '4/24/1963',
    publisher: 'Vinder',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '730006313-6',
    language: 'Czech',
    pageCount: 1000,
    price: 73.76,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '5884bd8b-46fb-4fb3-9a39-52acf38b1d3a'
  },
  {
    _id: 'cdba64f8-7937-46f7-b244-656d278d2f3a',
    title: 'Marley & Me',
    genres: ['Gothic'],
    publicationDate: '10/23/1970',
    publisher: 'Lazz',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '057843987-5',
    language: 'Fijian',
    pageCount: 343,
    price: 29.96,
    format: ['Hardcover'],
    authorId: 'cdf048ac-6874-45e9-8a93-2f561c22ed4e'
  },
  {
    _id: 'ab888179-a9b2-4424-b7b8-5490c634bea3',
    title: 'Secret Life of Walter Mitty, The',
    genres: ['Southern Gothic Fiction', 'Personal Development'],
    publicationDate: '12/5/1922',
    publisher: 'Thoughtbeat',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '114227824-7',
    language: 'Sotho',
    pageCount: 382,
    price: 77.06,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '888ab9d8-f91e-4640-a951-54100e50d454'
  },
  {
    _id: '85dea13e-fd28-44f0-8f43-ecdeedfe9df5',
    title: "Satan's School for Girls",
    genres: ['Dystopian'],
    publicationDate: '1/22/1910',
    publisher: 'Zoomcast',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '298245967-1',
    language: 'Luxembourgish',
    pageCount: 411,
    price: 37.53,
    format: ['Hardcover'],
    authorId: '45a36ffa-56fd-4366-8d5a-2e685b286702'
  },
  {
    _id: '5c857aa2-3dbb-459a-a738-2ba75f38b0b2',
    title: 'Scum',
    genres: ['Science Fiction', 'Mystery', 'Southern Gothic Fiction'],
    publicationDate: '11/25/1931',
    publisher: 'Browsezoom',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '709036093-8',
    language: 'Tsonga',
    pageCount: 951,
    price: 15.82,
    format: ['Paperback', 'E-Book'],
    authorId: '38cb7ec6-0150-4382-bb7b-79fc3d8ef293'
  },
  {
    _id: '40d5233d-9fcf-45e6-81e7-b27b81b3177a',
    title: 'Life of Jesus, The (La vie de Jésus)',
    genres: ['Adventure', 'Paranormal', 'Guide / How-to'],
    publicationDate: '10/17/1976',
    publisher: 'Vimbo',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '439872211-4',
    language: 'Malay',
    pageCount: 11,
    price: 47.05,
    format: ['Hardcover'],
    authorId: 'b015046f-5b36-4f1a-bec9-e25b8c0a74f6'
  },
  {
    _id: '81e4af9c-c3ec-4df2-b1b5-ebacf5e50153',
    title: 'Stage Fright',
    genres: ['Science Fiction', 'Bildungsroman', 'Memoir', 'Children’s'],
    publicationDate: '8/10/1977',
    publisher: 'Blognation',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '180999851-4',
    language: 'Spanish',
    pageCount: 882,
    price: 90.18,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'ce8bda8f-d13c-4035-95d9-1e0644a76172'
  },
  {
    _id: 'fa4aba6c-6867-4ef8-ba2f-98bc0444c1d1',
    title: 'Kissing Jessica Stein',
    genres: ['Personal Development', 'Humor', 'Art'],
    publicationDate: '4/3/1959',
    publisher: 'Lajo',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '213990417-6',
    language: 'Catalan',
    pageCount: 442,
    price: 46.54,
    format: ['Hardcover'],
    authorId: '6c5c2a7a-70ae-4d69-b786-b89391ea74fd'
  },
  {
    _id: '19dd4956-c9e0-48ef-a957-8838ba361463',
    title: 'Last Unicorn, The',
    genres: ['Guide / How-to'],
    publicationDate: '8/4/1929',
    publisher: 'Katz',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '921009730-0',
    language: 'Yiddish',
    pageCount: 508,
    price: 30.02,
    format: ['E-Book', 'Hardcover'],
    authorId: '6a072217-4ef7-4c73-9117-7a51f0cae605'
  },
  {
    _id: '69904ca4-820b-4cb6-a4a0-038d64d5474a',
    title: 'Balzac and the Little Chinese Seamstress (Xiao cai feng)',
    genres: ['Horror', 'Motivational', 'Thriller', 'History', 'Children’s'],
    publicationDate: '7/14/2004',
    publisher: 'Yodoo',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '973647245-0',
    language: 'West Frisian',
    pageCount: 69,
    price: 1.22,
    format: ['Hardcover'],
    authorId: 'c6d946f2-5a8a-4961-8d87-f238202062d0'
  },
  {
    _id: '60fc79c8-acd7-44ec-839e-c4f9b7dfa3c0',
    title: 'Divine Madness!',
    genres: [
      'Gothic',
      'Guide / How-to',
      'Bildungsroman',
      'Paranormal',
      'Adventure'
    ],
    publicationDate: '10/27/1907',
    publisher: 'Yoveo',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '355547035-3',
    language: 'Papiamento',
    pageCount: 76,
    price: 62.66,
    format: ['Hardcover', 'E-Book'],
    authorId: 'bf51dd35-1eb4-4ba7-8ad2-36e726801715'
  },
  {
    _id: '918e6e35-5681-4f92-a636-1a2a34e9cc67',
    title: "Blackbeard's Ghost",
    genres: [
      'Families & Relationships',
      'Southern Gothic Fiction',
      'Historical fiction',
      'Memoir'
    ],
    publicationDate: '1/17/2021',
    publisher: 'Mydo',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '596865337-X',
    language: 'Icelandic',
    pageCount: 624,
    price: 91.54,
    format: ['E-Book', 'Paperback'],
    authorId: '59d00508-ed3b-44ec-ab33-6629eff4c5ae'
  },
  {
    _id: 'e59481cd-197f-474d-a2b1-58afdff0a9d4',
    title: 'Ride Along',
    genres: ['Cookbook', 'Gothic'],
    publicationDate: '1/15/1981',
    publisher: 'Kwinu',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '699684480-0',
    language: 'Hindi',
    pageCount: 797,
    price: 72.17,
    format: ['E-Book'],
    authorId: '71d6bac3-13d3-48ec-adc5-50169e4567a0'
  },
  {
    _id: 'b34dc287-b9bf-4aec-8502-0d67a8a6ff2f',
    title: 'Menace II Society',
    genres: [
      'Personal Development',
      'Health',
      'Horror',
      'Southern Gothic Fiction'
    ],
    publicationDate: '9/11/1930',
    publisher: 'Devcast',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '935824244-2',
    language: 'Assamese',
    pageCount: 481,
    price: 66.99,
    format: ['E-Book', 'Paperback'],
    authorId: '888ab9d8-f91e-4640-a951-54100e50d454'
  },
  {
    _id: 'b0ea221c-0938-49db-800d-966fb0bedfc9',
    title: 'Koyaanisqatsi (a.k.a. Koyaanisqatsi: Life Out of Balance)',
    genres: ['Personal Development'],
    publicationDate: '6/6/1994',
    publisher: 'Fanoodle',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '402990356-8',
    language: 'Korean',
    pageCount: 1,
    price: 59.19,
    format: ['E-Book'],
    authorId: '57ccf8e3-8b09-4364-afed-9a9546962d33'
  },
  {
    _id: 'c7037562-9c5f-43c0-a025-5e6eb0235cef',
    title: 'Conscientious Objector, The',
    genres: ['Mystery'],
    publicationDate: '12/13/2018',
    publisher: 'Babbleset',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '680837769-3',
    language: 'Kashmiri',
    pageCount: 362,
    price: 90.89,
    format: ['Paperback'],
    authorId: '904574ea-489e-4375-883d-2be72aa070be'
  },
  {
    _id: 'abaa574f-39ca-4e0e-acbe-99ea00cf9d2c',
    title: 'Basic Instinct',
    genres: ['Travel', 'Personal Development', 'Gothic'],
    publicationDate: '3/23/1961',
    publisher: 'Twimm',
    summary: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '947702345-0',
    language: 'Kyrgyz',
    pageCount: 754,
    price: 24.98,
    format: ['E-Book', 'Paperback'],
    authorId: '3693b60f-d979-4370-89dc-54c243a7c8af'
  },
  {
    _id: 'f91b7b56-5123-436c-8b77-64ffaeba2b25',
    title: 'Employment, The (Empleo, El)',
    genres: ['Paranormal', 'Humor', 'Art', 'Cookbook'],
    publicationDate: '3/12/1972',
    publisher: 'Edgepulse',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '025970738-4',
    language: 'Malagasy',
    pageCount: 754,
    price: 28.57,
    format: ['Paperback'],
    authorId: 'c6b583b0-8011-496d-a23b-8d6e62d43a38'
  },
  {
    _id: 'bd12add8-27ce-4ff5-a3db-6d2a16b7ef31',
    title: 'Flaming Creatures',
    genres: [
      'Travel',
      'Health',
      'Families & Relationships',
      'Motivational',
      'Science Fiction'
    ],
    publicationDate: '6/15/2011',
    publisher: 'Cogidoo',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '907457585-4',
    language: 'Guaraní',
    pageCount: 801,
    price: 50.41,
    format: ['E-Book', 'Hardcover'],
    authorId: '9b9e7564-d1d5-4c40-a040-5ae6e72a54b0'
  },
  {
    _id: '50d61300-2207-4bca-9c93-192578183341',
    title: 'Vengeance Can Wait',
    genres: ['Humor', 'Adventure', 'Mystery'],
    publicationDate: '7/15/1937',
    publisher: 'Zoonoodle',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '796529094-4',
    language: 'Albanian',
    pageCount: 689,
    price: 54.35,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'b4a12c46-5eec-4d9c-9662-8a1234b0233b'
  },
  {
    _id: '62e2adf8-901a-4a1c-9248-ab2b98a3a559',
    title: 'Madame Curie',
    genres: ['Guide / How-to', 'Fiction', 'Motivational'],
    publicationDate: '11/26/1954',
    publisher: 'Topiclounge',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '548017271-9',
    language: 'Khmer',
    pageCount: 777,
    price: 88.23,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'd900d786-8c6b-4397-baf9-2a63650e5b75'
  },
  {
    _id: 'c716df46-625a-40de-866d-9c50a8c24a2e',
    title: 'Unsinkable Molly Brown, The',
    genres: ['Horror', 'Bildungsroman', 'Dystopian'],
    publicationDate: '12/8/2016',
    publisher: 'Yadel',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '836674824-3',
    language: 'Portuguese',
    pageCount: 877,
    price: 51.67,
    format: ['Paperback'],
    authorId: '36f9f627-791c-4476-8a6c-cae6807be704'
  },
  {
    _id: '9b70a8b5-368d-471f-be67-feac3bb48197',
    title:
      'Singapore Sling (Singapore sling: O anthropos pou agapise ena ptoma)',
    genres: [
      'Families & Relationships',
      'Science Fiction',
      'Historical fiction',
      'Romance'
    ],
    publicationDate: '4/13/1987',
    publisher: 'Omba',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '798513876-5',
    language: 'Belarusian',
    pageCount: 278,
    price: 67.68,
    format: ['E-Book', 'Paperback'],
    authorId: '4e880e2f-9b90-413e-83b4-743431624957'
  },
  {
    _id: '5c412111-f9d4-4fd3-a3d9-a0fc13124c56',
    title: 'Bedtime Story',
    genres: ['Historical fiction', 'Memoir', 'Thriller', 'Guide / How-to'],
    publicationDate: '4/28/1950',
    publisher: 'Babbleopia',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '324080423-9',
    language: 'Yiddish',
    pageCount: 64,
    price: 37.76,
    format: ['Paperback', 'E-Book'],
    authorId: '8f05cd37-2622-4c6a-a5a7-d9d3b48cb3fe'
  },
  {
    _id: '81f68534-5da0-4a02-bd55-d6bc65106452',
    title: 'Man in the Chair',
    genres: ['Memoir', 'Contemporary', 'Adventure'],
    publicationDate: '3/22/1953',
    publisher: 'Kaymbo',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '883240030-8',
    language: 'Amharic',
    pageCount: 581,
    price: 98.51,
    format: ['E-Book', 'Hardcover'],
    authorId: '0771dc5a-d9bc-4fe1-a488-b5c68a136c39'
  },
  {
    _id: 'fb02ddc3-c832-4b03-a8ed-99bec1a6b2c0',
    title: 'Tales from the Darkside: The Movie',
    genres: ['Paranormal', 'Personal Development', 'Romance', 'Cookbook'],
    publicationDate: '6/23/1921',
    publisher: 'Lazz',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '358202600-0',
    language: 'Hindi',
    pageCount: 990,
    price: 17.02,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '8a45e2c9-90a7-4873-a839-0a7f63f0d4e4'
  },
  {
    _id: 'e0b1623f-bf41-4458-aeb9-d204c55462c7',
    title: 'Herbie Goes to Monte Carlo',
    genres: ['Thriller', 'Guide / How-to', 'Bildungsroman', 'Science Fiction'],
    publicationDate: '10/20/2017',
    publisher: 'Chatterpoint',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '262415044-7',
    language: 'Georgian',
    pageCount: 438,
    price: 32.55,
    format: ['Paperback', 'Hardcover'],
    authorId: 'f7ca40f3-7532-4e30-8294-033621c53d6e'
  },
  {
    _id: '1df07c01-8eba-47b6-bde3-bc0f8c725ed7',
    title: 'Down Twisted',
    genres: ['Memoir'],
    publicationDate: '7/27/1948',
    publisher: 'Bluezoom',
    summary: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '926362843-2',
    language: 'Telugu',
    pageCount: 380,
    price: 16.74,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '57ccf8e3-8b09-4364-afed-9a9546962d33'
  },
  {
    _id: '995cf4f0-4bd3-4ba7-a47c-fac5e3e17d0c',
    title: 'Edge of Seventeen',
    genres: ['Guide / How-to'],
    publicationDate: '2/15/1916',
    publisher: 'Aimbo',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '378278759-5',
    language: 'Armenian',
    pageCount: 177,
    price: 94.31,
    format: ['E-Book'],
    authorId: '52c6e175-5bf4-4671-ac86-665e4dc54901'
  },
  {
    _id: 'c0d8abc0-16df-415b-a8ed-a1235b238a27',
    title: 'Enforcer, The (Gei ba ba de xin)',
    genres: ['Personal Development', 'Thriller'],
    publicationDate: '2/28/1954',
    publisher: 'Fiveclub',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '167675966-2',
    language: 'Albanian',
    pageCount: 402,
    price: 92.82,
    format: ['Paperback'],
    authorId: 'b073ca58-2055-4889-9f0c-0b6d86fee312'
  },
  {
    _id: 'fd2b09ac-45a9-408d-b230-d03cffb464be',
    title: 'Crime and Punishment',
    genres: ['Adventure'],
    publicationDate: '6/17/1975',
    publisher: 'Gigabox',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '780216260-2',
    language: 'New Zealand Sign Language',
    pageCount: 484,
    price: 35.45,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '02c0d1d7-45a5-4429-a0aa-374313af1cc5'
  },
  {
    _id: '32a75292-f5f4-4730-b421-9e37cb0eda92',
    title: 'Hunting Elephants',
    genres: ['Dystopian', 'Self-help'],
    publicationDate: '2/14/1919',
    publisher: 'Realbridge',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '171720021-4',
    language: 'Bislama',
    pageCount: 651,
    price: 82.38,
    format: ['E-Book'],
    authorId: '7a055765-959d-44b0-bcf6-2c07589aec11'
  },
  {
    _id: '8717082f-cde3-4407-8ed9-a3017ce2136a',
    title: 'And Your Mother Too (Y tu mamá también)',
    genres: ['Motivational'],
    publicationDate: '7/22/1952',
    publisher: 'Devify',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '853093971-9',
    language: 'Tetum',
    pageCount: 797,
    price: 38.18,
    format: ['E-Book', 'Hardcover'],
    authorId: '19fcdd32-aa73-4585-ade7-9cbf34ee4958'
  },
  {
    _id: 'b261d2d4-11c9-44b4-95de-31bc22de27f5',
    title: 'The Iron Commissioner',
    genres: [
      'Motivational',
      'Thriller',
      'Self-help',
      'Families & Relationships',
      'Romance'
    ],
    publicationDate: '8/20/2010',
    publisher: 'Thoughtsphere',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '621174663-6',
    language: 'Irish Gaelic',
    pageCount: 465,
    price: 61.1,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '83a8878d-d10e-4c3d-adc5-ed88487d1888'
  },
  {
    _id: '3a379e4e-d0e3-47fe-b088-52bc4d6fceb0',
    title: "Sorcerer's Apprentice, The",
    genres: ['Romance'],
    publicationDate: '5/26/1910',
    publisher: 'Photospace',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '023092549-9',
    language: 'Moldovan',
    pageCount: 614,
    price: 8.32,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'a122a3ba-36c2-48d1-9014-83cd41e17953'
  },
  {
    _id: '0696810e-13b2-4f07-8c22-e4bc62f753e7',
    title: 'Sound City',
    genres: [
      'Paranormal',
      'Personal Development',
      'Gothic',
      'Families & Relationships'
    ],
    publicationDate: '8/22/1974',
    publisher: 'Jabbercube',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '563814286-X',
    language: 'Hindi',
    pageCount: 79,
    price: 36.44,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '8f05cd37-2622-4c6a-a5a7-d9d3b48cb3fe'
  },
  {
    _id: '5f8e8568-d2c4-4909-ab19-df089dedd029',
    title: 'Eila, Rampe and Likka',
    genres: ['Humor'],
    publicationDate: '9/8/1919',
    publisher: 'Jabbersphere',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '430432909-X',
    language: 'Belarusian',
    pageCount: 892,
    price: 53.67,
    format: ['Paperback', 'E-Book'],
    authorId: 'd104aabb-d820-4110-9cfb-1f9a7ad51d76'
  },
  {
    _id: '24db3c5b-2878-4b58-aa12-734136a6002a',
    title: 'Cincinnati Kid, The',
    genres: ['Health', 'History', 'Contemporary'],
    publicationDate: '4/4/1966',
    publisher: 'Meevee',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '133508288-3',
    language: 'Norwegian',
    pageCount: 130,
    price: 19.53,
    format: ['Hardcover'],
    authorId: '0396f370-f0b1-492b-8200-5003b76e66b2'
  },
  {
    _id: '056133df-59a6-43ed-9d00-98706dac2714',
    title: 'Fearless',
    genres: ['Gothic', 'Travel', 'Science Fiction'],
    publicationDate: '2/8/2004',
    publisher: 'Edgeify',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '221814503-0',
    language: 'Somali',
    pageCount: 854,
    price: 97.98,
    format: ['E-Book', 'Paperback'],
    authorId: 'c9dd26e0-d10a-41fe-b54e-1f50cc288915'
  },
  {
    _id: 'dfd7393a-df7d-4a4a-a559-257420e68ba8',
    title: 'Good Boy!',
    genres: ['Families & Relationships', 'Art', 'Motivational', 'Horror'],
    publicationDate: '6/2/2016',
    publisher: 'Realbuzz',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '736588083-X',
    language: 'Bulgarian',
    pageCount: 879,
    price: 83.28,
    format: ['E-Book', 'Paperback'],
    authorId: '29309feb-4a7a-4e55-88d2-747df6f763c5'
  },
  {
    _id: '74968546-0c84-4b2b-90c4-10e2442f442e',
    title: 'Shiver (Eskalofrío)',
    genres: ['Art', 'Families & Relationships'],
    publicationDate: '11/12/2009',
    publisher: 'Kwideo',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '837738528-7',
    language: 'Moldovan',
    pageCount: 844,
    price: 29.73,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '90bfbe58-8cd0-4052-9c32-45c611c51e91'
  },
  {
    _id: '0538fbe5-5334-48c7-8b1c-19c2c294d961',
    title: "It's A Wonderful World",
    genres: [
      'Personal Development',
      'Guide / How-to',
      'Cookbook',
      'Gothic',
      'Bildungsroman'
    ],
    publicationDate: '2/20/2015',
    publisher: 'Jetpulse',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '186032159-3',
    language: 'Swedish',
    pageCount: 765,
    price: 27.25,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '29309feb-4a7a-4e55-88d2-747df6f763c5'
  },
  {
    _id: '3bc9a7cf-7ceb-4914-a850-852833ae706d',
    title: 'Mina Tannenbaum',
    genres: ['Children’s', 'Health', 'History', 'Cookbook'],
    publicationDate: '10/18/1912',
    publisher: 'Topdrive',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '312976054-7',
    language: 'Czech',
    pageCount: 218,
    price: 14.57,
    format: ['E-Book', 'Paperback'],
    authorId: '76ade80d-1b0e-49ef-8e20-a1d2b193bb06'
  },
  {
    _id: 'e97320da-3e5e-429c-894b-a320a295bf16',
    title: 'Dinosaur 13',
    genres: ['Dystopian', 'Motivational', 'Adventure'],
    publicationDate: '8/19/1959',
    publisher: 'Youfeed',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '670764320-7',
    language: 'Guaraní',
    pageCount: 832,
    price: 56.73,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '71d6bac3-13d3-48ec-adc5-50169e4567a0'
  },
  {
    _id: 'f93b2d12-6914-4e9e-8257-fd12c0a32c80',
    title: 'Girl with the Dragon Tattoo, The (Män som hatar kvinnor)',
    genres: ['Mystery'],
    publicationDate: '2/15/1934',
    publisher: 'Viva',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '944105562-X',
    language: 'Kashmiri',
    pageCount: 136,
    price: 81.27,
    format: ['Paperback', 'E-Book'],
    authorId: 'b015046f-5b36-4f1a-bec9-e25b8c0a74f6'
  },
  {
    _id: '93cb94e5-728a-4a3b-8830-4e9e6fea2908',
    title: 'Dollman vs. Demonic Toys',
    genres: [
      'History',
      'Guide / How-to',
      'Southern Gothic Fiction',
      'Adventure'
    ],
    publicationDate: '6/16/1913',
    publisher: 'Eidel',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '726294116-X',
    language: 'Estonian',
    pageCount: 35,
    price: 16.72,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '0b5c7c70-f14f-4ee2-ab72-bcfc0281c97f'
  },
  {
    _id: '131c7962-6fb7-466b-8150-0f64d1577cad',
    title: 'Unmade Beds',
    genres: [
      'Families & Relationships',
      'Science Fiction',
      'Adventure',
      'Romance',
      'Art'
    ],
    publicationDate: '11/30/1957',
    publisher: 'Devpulse',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '201957093-9',
    language: 'Malagasy',
    pageCount: 207,
    price: 99.68,
    format: ['Paperback', 'Hardcover'],
    authorId: '9ffaabec-fe9e-4c5e-b81d-054b562d168b'
  },
  {
    _id: 'e7eed453-6ec3-4921-a222-55f4d31ea3b8',
    title: 'Bloody Pit of Horror (Il boia scarlatto) (Virgins for the Hangman)',
    genres: ['History', 'Families & Relationships', 'Fiction'],
    publicationDate: '6/15/2012',
    publisher: 'Meejo',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '176730088-3',
    language: 'Korean',
    pageCount: 941,
    price: 68.85,
    format: ['Paperback'],
    authorId: '23e80b21-2fd0-4a4e-9397-f578a8c0a057'
  },
  {
    _id: '6bbb6f04-77c7-4a63-ae5a-c6885551cd04',
    title: 'Rainbow Valley',
    genres: ['Memoir', 'Personal Development', 'Art'],
    publicationDate: '3/21/1987',
    publisher: 'Tagfeed',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '267381521-X',
    language: 'Bosnian',
    pageCount: 709,
    price: 32.33,
    format: ['E-Book', 'Paperback'],
    authorId: '1cf7e66d-5270-4763-b49a-1631caa80745'
  },
  {
    _id: '4c2e7613-ca4e-4141-945d-ed63928dc3dd',
    title: 'Heiter bis wolkig',
    genres: ['Children’s', 'Bildungsroman'],
    publicationDate: '8/19/1933',
    publisher: 'Wikibox',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '550626396-1',
    language: 'West Frisian',
    pageCount: 320,
    price: 5.26,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '52829d96-d5e7-4f7d-ba95-236b12449a16'
  },
  {
    _id: 'c6221e7b-8a00-4d7d-adf3-c76eebba17b6',
    title: 'Tin Drum, The (Blechtrommel, Die)',
    genres: ['Gothic'],
    publicationDate: '1/2/1969',
    publisher: 'Vinte',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '718111658-4',
    language: 'Hiri Motu',
    pageCount: 846,
    price: 5.86,
    format: ['E-Book', 'Paperback'],
    authorId: '9471e481-42b7-4d27-bfe6-b67db8569b75'
  },
  {
    _id: '84d94a06-2e57-457b-b513-863eeb47de8e',
    title: 'Flamenco (de Carlos Saura)',
    genres: ['Dystopian', 'Self-help', 'Humor', 'Fiction'],
    publicationDate: '6/11/1934',
    publisher: 'Yodoo',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '953007005-5',
    language: 'Montenegrin',
    pageCount: 426,
    price: 50.38,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'a1c3fc06-4b6c-42f9-9059-41273a7ba4f2'
  },
  {
    _id: 'a54b8039-0bf6-44a9-b11f-0614f4cc6b3e',
    title: 'Mother of Mine (Äideistä parhain)',
    genres: ['Travel', 'Cookbook', 'Romance'],
    publicationDate: '9/18/1954',
    publisher: 'Jaxspan',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '792835158-7',
    language: 'Lao',
    pageCount: 635,
    price: 8.7,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '309527ab-c171-4f50-9e20-a221e820eed3'
  },
  {
    _id: '94348224-7c9e-4840-b058-9c84b555abbc',
    title: 'Mo',
    genres: ['Southern Gothic Fiction', 'Historical fiction'],
    publicationDate: '2/26/1937',
    publisher: 'Browsezoom',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '804246373-1',
    language: 'Malayalam',
    pageCount: 863,
    price: 44.9,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '323edad0-87ac-46b3-b5a3-b0b2ace82293'
  },
  {
    _id: '6a3d372b-3035-4c6b-80c0-a9aa12aa6bdf',
    title: 'Pinocchio',
    genres: ['Romance', 'Guide / How-to', 'Adventure', 'Health'],
    publicationDate: '4/30/1994',
    publisher: 'Tagopia',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '845811486-0',
    language: 'Māori',
    pageCount: 251,
    price: 23.19,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '38efca15-98d3-46b5-9b8d-fa27546c21b6'
  },
  {
    _id: '023e5a19-e295-4efa-97ea-3b6c45a9c82d',
    title: 'Colpo in canna',
    genres: ['Romance', 'Cookbook', 'Personal Development', 'Thriller'],
    publicationDate: '1/21/1955',
    publisher: 'Twitterwire',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '210507345-X',
    language: 'Lithuanian',
    pageCount: 475,
    price: 54.04,
    format: ['E-Book', 'Paperback'],
    authorId: '9471e481-42b7-4d27-bfe6-b67db8569b75'
  },
  {
    _id: '29a1f9e9-ff23-47a2-bd5f-450df366f99c',
    title: 'Purple Plain, The',
    genres: ['Health', 'Fiction', 'Paranormal'],
    publicationDate: '5/22/1927',
    publisher: 'Edgeify',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '412361611-9',
    language: 'Marathi',
    pageCount: 695,
    price: 84.7,
    format: ['Paperback', 'E-Book'],
    authorId: '11d8a604-6039-4287-ad62-4a1359cb9929'
  },
  {
    _id: '046f00b9-7dfc-4b42-a139-0c3c4ab8c2fe',
    title: 'Severed Arm, The',
    genres: ['Paranormal', 'Historical fiction', 'History', 'Science Fiction'],
    publicationDate: '4/9/1910',
    publisher: 'Buzzshare',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '959477177-1',
    language: 'Yiddish',
    pageCount: 597,
    price: 63.29,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '6ab99a6b-d96f-4b3b-9402-760e054e3c7d'
  },
  {
    _id: '2d8fc8aa-550a-4c93-b0bd-d9c66aea2a2f',
    title: 'Bird of Prey',
    genres: ['Health', 'Art', 'Historical fiction', 'Contemporary'],
    publicationDate: '3/4/1979',
    publisher: 'Zoomdog',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '455941881-0',
    language: 'West Frisian',
    pageCount: 526,
    price: 5.88,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'f645d28a-670a-457a-b55f-a32876b8511d'
  },
  {
    _id: '55f81db4-cdb4-43c2-a11c-745e9abc408d',
    title: 'Ploy',
    genres: [
      'Motivational',
      'Southern Gothic Fiction',
      'Self-help',
      'Families & Relationships',
      'Romance'
    ],
    publicationDate: '4/10/2005',
    publisher: 'Devbug',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '037398571-1',
    language: 'French',
    pageCount: 723,
    price: 19.89,
    format: ['Hardcover', 'Paperback'],
    authorId: '6072fb46-42e3-4c32-9cc5-d11d1531a642'
  },
  {
    _id: '4b0ad9ec-2af5-4dd8-8b7e-e2e58e2889f8',
    title: 'Lost Boundaries',
    genres: ['Health', 'Contemporary'],
    publicationDate: '2/17/1965',
    publisher: 'Quatz',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '337897981-X',
    language: 'Polish',
    pageCount: 705,
    price: 28.23,
    format: ['E-Book'],
    authorId: 'd8d43bcb-285b-492b-a3eb-d599563b6e8e'
  },
  {
    _id: '4bf0fb43-b39a-40cc-a656-e007e10d12bc',
    title: 'In Love and War',
    genres: ['Art', 'Families & Relationships'],
    publicationDate: '5/22/1982',
    publisher: 'Gabvine',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '519748767-4',
    language: 'Hungarian',
    pageCount: 953,
    price: 62.45,
    format: ['E-Book', 'Hardcover'],
    authorId: '616c089e-f551-4abe-82e0-0b0e1162c10b'
  },
  {
    _id: 'ffcbfd74-d036-435b-a6b6-a8fed56cdb6d',
    title: '10th Victim, The (La decima vittima)',
    genres: ['Bildungsroman', 'History', 'Fiction'],
    publicationDate: '12/16/1991',
    publisher: 'Gigaclub',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '181155713-9',
    language: 'Lithuanian',
    pageCount: 495,
    price: 27.46,
    format: ['E-Book'],
    authorId: '3da1856a-3072-493d-8f30-77e3381a9f1d'
  },
  {
    _id: 'f4fb9201-2030-4bd5-9cf5-57aa2e506e1d',
    title: 'Night of the Living Dead',
    genres: ['Paranormal', 'Contemporary', 'Art', 'Fiction', 'Romance'],
    publicationDate: '5/25/1931',
    publisher: 'Wordpedia',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '438716162-0',
    language: 'Danish',
    pageCount: 375,
    price: 58.81,
    format: ['Paperback'],
    authorId: '8baedb8e-4a69-4f01-82b3-0b4374d74ad4'
  },
  {
    _id: '2ab25ff6-7373-4709-a4a0-34dc97470b1e',
    title: 'Serious Moonlight',
    genres: [
      'Motivational',
      'Guide / How-to',
      'Gothic',
      'Personal Development',
      'Bildungsroman'
    ],
    publicationDate: '12/13/1960',
    publisher: 'Layo',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '203650021-8',
    language: 'Bulgarian',
    pageCount: 814,
    price: 92.76,
    format: ['Paperback', 'E-Book'],
    authorId: 'ce9d7482-72d1-4067-9212-62516c7d139b'
  },
  {
    _id: 'db726510-65e6-46dd-bdbb-d88476dffce1',
    title: 'How to Train Your Dragon 2',
    genres: ['Travel', 'Fiction', 'Cookbook', 'Dystopian', 'Romance'],
    publicationDate: '2/5/1961',
    publisher: 'Meetz',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '528154283-4',
    language: 'Lithuanian',
    pageCount: 185,
    price: 37.87,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '25abba4a-375c-44db-8469-d6fd32183d8f'
  },
  {
    _id: '06c4b452-6006-4f41-acc7-4965aebd5f8c',
    title: "That's Entertainment! III",
    genres: ['Contemporary'],
    publicationDate: '1/24/2016',
    publisher: 'Feedmix',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '551351073-1',
    language: 'Haitian Creole',
    pageCount: 361,
    price: 82.15,
    format: ['E-Book'],
    authorId: 'efa93868-002b-4cf5-a332-1a61c642e834'
  },
  {
    _id: 'ac3fbb76-1508-44b1-8937-757de003ddbf',
    title: 'Born Reckless',
    genres: ['Bildungsroman', 'Mystery', 'Southern Gothic Fiction'],
    publicationDate: '1/1/1902',
    publisher: 'Centimia',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '109313286-8',
    language: 'West Frisian',
    pageCount: 667,
    price: 98.02,
    format: ['Hardcover', 'E-Book'],
    authorId: '1f5a200e-ebad-4ea8-b113-266f7ad826cd'
  },
  {
    _id: '1a53d1c2-23e4-4348-8d41-23dc57430b4d',
    title: 'Kite Runner, The',
    genres: [
      'Families & Relationships',
      'Children’s',
      'Fiction',
      'Science Fiction'
    ],
    publicationDate: '4/12/1966',
    publisher: 'Twinder',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '470744932-8',
    language: 'Gujarati',
    pageCount: 46,
    price: 20.22,
    format: ['Paperback', 'Hardcover'],
    authorId: 'a9e093e8-df30-437b-a9fd-83cf65f507d4'
  },
  {
    _id: '4ff8fcdc-51e4-4629-9dae-58f10f6d9a36',
    title: 'Vietnam in HD',
    genres: ['Mystery'],
    publicationDate: '6/14/1993',
    publisher: 'Devpoint',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '910516259-9',
    language: 'Kurdish',
    pageCount: 912,
    price: 97,
    format: ['Paperback', 'Hardcover'],
    authorId: '83133959-f0e4-47b0-beba-7f7b1cd71a24'
  },
  {
    _id: 'dbaee7af-9373-4307-a1ae-9f590ae75e4c',
    title: 'There Was a Father (Chichi ariki)',
    genres: ['Mystery'],
    publicationDate: '8/14/1952',
    publisher: 'Pixonyx',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '161919180-6',
    language: 'Malayalam',
    pageCount: 649,
    price: 81.23,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '63a2a9d6-1f33-449c-8ea7-44a19f9a4f93'
  },
  {
    _id: '30772fd6-98d5-4a75-9f40-aaf9f6a7514b',
    title: 'Method to the Madness of Jerry Lewis',
    genres: [
      'Contemporary',
      'Paranormal',
      'Personal Development',
      'Romance',
      'Dystopian'
    ],
    publicationDate: '5/30/1918',
    publisher: 'Demizz',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '749591593-5',
    language: 'Montenegrin',
    pageCount: 219,
    price: 38.26,
    format: ['Hardcover'],
    authorId: 'de2ce351-11a6-4425-92d6-e51a7f546a7b'
  },
  {
    _id: '3d443b49-2480-4055-aabb-560658cf8c7f',
    title: 'Tinpis Run',
    genres: ['Paranormal', 'Dystopian', 'Historical fiction', 'Children’s'],
    publicationDate: '3/12/1917',
    publisher: 'Digitube',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '960998282-4',
    language: 'Kazakh',
    pageCount: 223,
    price: 94.94,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '7e5ac46a-3b7e-480f-a394-26aa9b8fc722'
  },
  {
    _id: '0b39742b-8ad1-4db3-8de3-f66e82404666',
    title: 'Beijing Bicycle (Shiqi sui de dan che)',
    genres: ['Historical fiction', 'Guide / How-to', 'History', 'Self-help'],
    publicationDate: '8/23/1955',
    publisher: 'Eayo',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '910212221-9',
    language: 'Marathi',
    pageCount: 851,
    price: 25.6,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'bae5536c-ae91-477f-a7eb-bcd11873baaf'
  },
  {
    _id: 'f1267e02-ef43-4c40-b02b-56d0f7d0ee70',
    title: 'Wreck of the Mary Deare, The',
    genres: ['Bildungsroman', 'Mystery', 'Thriller', 'Self-help', 'Romance'],
    publicationDate: '4/25/2019',
    publisher: 'Blognation',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '751934706-0',
    language: 'Somali',
    pageCount: 381,
    price: 2.53,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'bfcd785c-5c08-4410-b5e3-fa286931ff0b'
  },
  {
    _id: '9e2002a1-92da-43ba-bd46-33e4d93966ad',
    title: 'A mí las mujeres ni fu ni fa',
    genres: [
      'Memoir',
      'Art',
      'Southern Gothic Fiction',
      'Families & Relationships',
      'Horror'
    ],
    publicationDate: '3/30/1927',
    publisher: 'Rhyloo',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '165347244-8',
    language: 'Tswana',
    pageCount: 588,
    price: 93.68,
    format: ['Paperback'],
    authorId: '15a9dc9d-5c8b-42af-84b2-09aff89b8e56'
  },
  {
    _id: '48559ba2-bc53-4960-8115-8cbd9beafcf3',
    title: 'Greening of Whitney Brown, The',
    genres: ['Motivational'],
    publicationDate: '12/26/1938',
    publisher: 'Topicware',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '613699907-2',
    language: 'Croatian',
    pageCount: 430,
    price: 18.64,
    format: ['Paperback', 'Hardcover'],
    authorId: '6072fb46-42e3-4c32-9cc5-d11d1531a642'
  },
  {
    _id: '0cff6b07-1f6f-4359-a472-93a3841a8ed9',
    title: 'Seance (Kôrei)',
    genres: ['Southern Gothic Fiction'],
    publicationDate: '12/18/1976',
    publisher: 'Blogtags',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '857218747-2',
    language: 'Moldovan',
    pageCount: 515,
    price: 38.97,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '6c17ed87-adc0-4b74-a785-4cf52b7a5a6d'
  },
  {
    _id: '239eac45-ff2d-44a8-ba98-a57416dff561',
    title: 'Way Home, The (Jibeuro)',
    genres: ['Gothic', 'Motivational'],
    publicationDate: '1/13/1973',
    publisher: 'Brainlounge',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '166098522-6',
    language: 'Hebrew',
    pageCount: 385,
    price: 24.21,
    format: ['Paperback'],
    authorId: '5a5c7c5f-8258-433c-aed7-2a498d355659'
  },
  {
    _id: '0a8d8de5-a446-4b13-8599-1d9b40e72d24',
    title: 'Think Like a Man Too',
    genres: ['Art', 'Southern Gothic Fiction'],
    publicationDate: '6/19/1911',
    publisher: 'Zoozzy',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '599018847-1',
    language: 'Tsonga',
    pageCount: 825,
    price: 5.85,
    format: ['Paperback'],
    authorId: '4a817c42-ca8c-4be8-8df6-02e99b357a45'
  },
  {
    _id: 'a0cd32a0-a4a0-4d89-a636-861baa286e89',
    title: "Belles of St. Trinian's, The",
    genres: ['Health'],
    publicationDate: '3/15/1996',
    publisher: 'Lazzy',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '433893567-7',
    language: 'Quechua',
    pageCount: 896,
    price: 68.76,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'efa93868-002b-4cf5-a332-1a61c642e834'
  },
  {
    _id: 'c42d4d89-4dbf-4221-b1b9-8087da5665b1',
    title: 'Blackout (Murder by Proxy)',
    genres: ['Romance', 'Contemporary', 'Gothic', 'Fiction', 'Paranormal'],
    publicationDate: '5/11/1913',
    publisher: 'Browsecat',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '533542627-6',
    language: 'Marathi',
    pageCount: 990,
    price: 86.88,
    format: ['Paperback'],
    authorId: '882dae67-dbf4-442a-9efd-2175c140f0f0'
  },
  {
    _id: '46859e66-324a-41ad-ac7a-52e824399c3a',
    title: "Amy's O (a.k.a. Amy's Orgasm)",
    genres: ['Children’s', 'Bildungsroman'],
    publicationDate: '9/8/1974',
    publisher: 'Oba',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '172227652-5',
    language: 'Italian',
    pageCount: 160,
    price: 48.93,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '8f05cd37-2622-4c6a-a5a7-d9d3b48cb3fe'
  },
  {
    _id: '2f4bf765-e238-422d-bfb9-a7a40897d5b0',
    title: 'Street People',
    genres: ['Families & Relationships', 'Children’s', 'Mystery', 'Adventure'],
    publicationDate: '5/27/1946',
    publisher: 'Twitterwire',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '228967992-5',
    language: 'Armenian',
    pageCount: 550,
    price: 62.23,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'c4fab3c3-e39c-4705-afe3-f3db0a3e141c'
  },
  {
    _id: '6cf2acfd-c3e9-4573-b5fd-7164e2edfc31',
    title: "Smilla's Sense of Snow",
    genres: [
      'Guide / How-to',
      'Bildungsroman',
      'Romance',
      'Fiction',
      'Families & Relationships'
    ],
    publicationDate: '11/14/1933',
    publisher: 'Oloo',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '231420263-5',
    language: 'Afrikaans',
    pageCount: 477,
    price: 90.34,
    format: ['Hardcover'],
    authorId: 'd20d4350-ffc6-4125-959e-7a0e6b0480c4'
  },
  {
    _id: '85c76621-8a2e-4ffe-9ac6-e6c8ed41964f',
    title: 'Love Affair',
    genres: ['Mystery', 'Health', 'Personal Development', 'History', 'Humor'],
    publicationDate: '10/25/1967',
    publisher: 'Quinu',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    isbn: '068948665-0',
    language: 'Azeri',
    pageCount: 590,
    price: 9.21,
    format: ['Hardcover', 'E-Book'],
    authorId: '6bca2886-6a4e-4412-acf3-e65c4d41e976'
  },
  {
    _id: '18796c97-bd8d-4ab1-ab45-7718b71697aa',
    title: 'Gangs of Wasseypur',
    genres: ['Southern Gothic Fiction', 'Humor', 'Cookbook'],
    publicationDate: '2/11/1927',
    publisher: 'Voomm',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '656544890-6',
    language: 'Dhivehi',
    pageCount: 537,
    price: 71.36,
    format: ['E-Book', 'Hardcover'],
    authorId: 'af885c02-71b2-4f3f-b44c-31026713c254'
  },
  {
    _id: 'c6682b4f-68a6-453b-9be6-cca29f5204d2',
    title: 'Book of Fate, The (Kohtalon kirja)',
    genres: ['Southern Gothic Fiction'],
    publicationDate: '12/22/1902',
    publisher: 'Trilith',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '261313699-5',
    language: 'Telugu',
    pageCount: 655,
    price: 50.5,
    format: ['E-Book', 'Paperback'],
    authorId: '73a93e9c-6aa7-4b8e-8421-c1275e7f8dd5'
  },
  {
    _id: '20ca4703-2f51-4f5e-856b-f7a7ce2b97cc',
    title: 'Never Play Clever Again (Gendarme et les gendarmettes, Le)',
    genres: ['Children’s', 'Art', 'Historical fiction', 'Science Fiction'],
    publicationDate: '9/20/1926',
    publisher: 'Zoomdog',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '822275313-4',
    language: 'Amharic',
    pageCount: 683,
    price: 44.74,
    format: ['Paperback'],
    authorId: '6eae44cc-641e-4670-9806-5a11d33be649'
  },
  {
    _id: '60b1b3e9-1bcc-469c-b725-5990cc43aa81',
    title: 'Punishment Park',
    genres: ['Personal Development'],
    publicationDate: '12/16/1971',
    publisher: 'Snaptags',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '616414652-6',
    language: 'Yiddish',
    pageCount: 23,
    price: 32.31,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '86abb841-936f-4afe-bce9-73199f45565f'
  },
  {
    _id: '346150e7-bf6f-481f-b555-c9ff760245f3',
    title: 'Dirty Mary Crazy Larry',
    genres: ['Southern Gothic Fiction', 'Self-help', 'Horror', 'Bildungsroman'],
    publicationDate: '12/20/1909',
    publisher: 'Oyondu',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '845312507-4',
    language: 'Sotho',
    pageCount: 763,
    price: 94.28,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'c6ba9f0c-e9e6-4190-a834-115f10349196'
  },
  {
    _id: '1d5e4129-2d92-43e1-bdc2-f6f84758e5d0',
    title: 'Harvard Beats Yale 29-29',
    genres: ['Travel', 'Motivational', 'Bildungsroman', 'Gothic'],
    publicationDate: '11/11/1976',
    publisher: 'Yakitri',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '863232648-1',
    language: 'Pashto',
    pageCount: 645,
    price: 20.77,
    format: ['E-Book'],
    authorId: 'c8ae1dbe-60e4-424e-9263-bb03447f6bbf'
  },
  {
    _id: '16b1f054-ea03-4420-9ba7-6d818c5b213e',
    title: 'Untamed Heart',
    genres: ['Historical fiction', 'Humor'],
    publicationDate: '3/12/1930',
    publisher: 'Devify',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '401155209-7',
    language: 'Kashmiri',
    pageCount: 615,
    price: 97.03,
    format: ['E-Book', 'Hardcover'],
    authorId: '0e603c9b-8801-48fe-95ec-312096990ca8'
  },
  {
    _id: '65fe2fe1-c7a8-423e-a8e2-d777ac28fb61',
    title: 'Upswing (Nousukausi)',
    genres: ['Bildungsroman', 'Cookbook', 'Memoir', 'Humor'],
    publicationDate: '4/28/1960',
    publisher: 'Mita',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '980499340-6',
    language: 'West Frisian',
    pageCount: 674,
    price: 21.93,
    format: ['Paperback', 'E-Book'],
    authorId: '3693b60f-d979-4370-89dc-54c243a7c8af'
  },
  {
    _id: '7780b9c9-118a-4ef6-a228-e7415cfeb35e',
    title: 'Red Lights',
    genres: ['Romance'],
    publicationDate: '4/7/1905',
    publisher: 'Voonyx',
    summary: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '096015769-7',
    language: 'Kurdish',
    pageCount: 60,
    price: 86.11,
    format: ['Hardcover'],
    authorId: 'fe943a18-1ea9-49ed-a5cd-30967dd95bd2'
  },
  {
    _id: '707c5253-619f-4cfa-88fc-00b7e651f8d7',
    title: "Doctors' Wives",
    genres: ['Mystery'],
    publicationDate: '9/30/1903',
    publisher: 'Eadel',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '268891145-7',
    language: 'Finnish',
    pageCount: 275,
    price: 99.36,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'e1f96db2-1e3f-4423-a896-6e81b6619653'
  },
  {
    _id: '48d80727-d77e-463c-be8d-5f61747e4b79',
    title: 'Twilight of the Golds, The',
    genres: ['Contemporary'],
    publicationDate: '2/4/1910',
    publisher: 'Avavee',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '753492262-3',
    language: 'Dzongkha',
    pageCount: 930,
    price: 19.32,
    format: ['Hardcover', 'Paperback'],
    authorId: '6ff250c1-ddaa-4abc-aeb2-8884a9f49a71'
  },
  {
    _id: '3eaebc6f-7dbf-4f48-8d1d-2d2699e7197c',
    title: 'Incredible Mr. Limpet, The',
    genres: ['History', 'Motivational', 'Children’s'],
    publicationDate: '11/30/1917',
    publisher: 'Katz',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '682095481-6',
    language: 'Catalan',
    pageCount: 129,
    price: 17.42,
    format: ['E-Book', 'Hardcover'],
    authorId: 'ff133d67-f674-493c-a301-55914ac411e2'
  },
  {
    _id: '2ca3742c-923f-451e-b898-284ee099a6f4',
    title: 'Codes of Gender, The',
    genres: ['Motivational'],
    publicationDate: '10/13/2005',
    publisher: 'Photofeed',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '209401495-9',
    language: 'Malay',
    pageCount: 778,
    price: 14.77,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'a1c17e9b-39b9-4e1a-a16b-b82467a85d38'
  },
  {
    _id: '9f0f1f6b-ed45-4148-85cd-7493b6df044a',
    title: 'To Die Like a Man (Morrer Como Um Homem)',
    genres: ['Mystery', 'Memoir', 'Horror', 'Fiction'],
    publicationDate: '2/19/1990',
    publisher: 'Realcube',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '105428084-3',
    language: 'Romanian',
    pageCount: 48,
    price: 24.1,
    format: ['Hardcover'],
    authorId: '8c2a33f2-0222-454d-89d4-4b8b79071c49'
  },
  {
    _id: '12a2ed17-b45b-4f8d-9354-98c7b9283c54',
    title: 'Season for Miracles, A',
    genres: [
      'Dystopian',
      'Cookbook',
      'Personal Development',
      'Health',
      'Bildungsroman'
    ],
    publicationDate: '6/27/1915',
    publisher: 'Realcube',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '429014332-6',
    language: 'Marathi',
    pageCount: 338,
    price: 1.1,
    format: ['E-Book'],
    authorId: '7e5ac46a-3b7e-480f-a394-26aa9b8fc722'
  },
  {
    _id: '1397cc61-2747-4625-a617-aedcfb41f53f',
    title: 'Au revoir les enfants',
    genres: ['Adventure', 'Paranormal', 'Guide / How-to'],
    publicationDate: '10/31/2009',
    publisher: 'Eayo',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '582522772-5',
    language: 'Bosnian',
    pageCount: 256,
    price: 5.17,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '60d69e11-f653-4d21-94b4-71c145def2ef'
  },
  {
    _id: 'a186c79c-a9b4-4467-9faa-dd77dfc95b69',
    title: 'Cop Land',
    genres: ['Cookbook', 'Humor'],
    publicationDate: '5/29/1955',
    publisher: 'Npath',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '076379941-6',
    language: 'Filipino',
    pageCount: 566,
    price: 0.16,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'e04c2206-7738-416e-ab72-aa7d846adbac'
  },
  {
    _id: '6f121cc1-afa9-4507-b4e7-26907e99f023',
    title: 'Cockneys vs Zombies',
    genres: ['Mystery', 'Horror', 'Memoir', 'Bildungsroman'],
    publicationDate: '11/27/1965',
    publisher: 'Riffpedia',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '717277440-X',
    language: 'Bengali',
    pageCount: 125,
    price: 62.49,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '736bc29c-b7d2-4e02-b38a-03cbe1334574'
  },
  {
    _id: 'e896c93f-7761-4ddc-b722-ca8d92b8cdc9',
    title: 'Devil in the Flesh',
    genres: ['Cookbook'],
    publicationDate: '12/14/1929',
    publisher: 'Babbleset',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '177581073-9',
    language: 'Japanese',
    pageCount: 378,
    price: 87.54,
    format: ['E-Book'],
    authorId: 'c7278d49-3e43-4cb8-8a09-a1eb4d86c8aa'
  },
  {
    _id: '9ddd27b8-7a97-4b10-938a-8934fcff7c56',
    title: 'That Guy... Who Was in That Thing',
    genres: ['Contemporary'],
    publicationDate: '12/12/1956',
    publisher: 'Babblestorm',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '725862981-5',
    language: 'Persian',
    pageCount: 90,
    price: 74.14,
    format: ['Paperback'],
    authorId: '7a055765-959d-44b0-bcf6-2c07589aec11'
  },
  {
    _id: '7f3ce70e-5dba-408b-afa3-5c948e13a2f0',
    title: 'Electra Glide in Blue',
    genres: ['Southern Gothic Fiction', 'Gothic', 'Horror'],
    publicationDate: '3/28/1995',
    publisher: 'Twinder',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '626547347-6',
    language: 'Tsonga',
    pageCount: 946,
    price: 91.76,
    format: ['Hardcover', 'Paperback'],
    authorId: '31c046f8-81ec-4d6d-a198-aff829899713'
  },
  {
    _id: 'a6120800-4abe-47f2-b991-4cf907ed8717',
    title: 'Slave Girls (Prehistoric Women)',
    genres: ['Bildungsroman'],
    publicationDate: '11/19/1924',
    publisher: 'Thoughtmix',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '056474055-1',
    language: 'Japanese',
    pageCount: 351,
    price: 99.18,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'b1be653b-93b3-4421-bce7-430d6d97f098'
  },
  {
    _id: 'd73427d1-59b4-4bc2-aef0-0c6ae5503399',
    title: 'Hitcher, The',
    genres: [
      'Children’s',
      'Families & Relationships',
      'Mystery',
      'Historical fiction'
    ],
    publicationDate: '1/12/1902',
    publisher: 'Agimba',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '085876180-7',
    language: 'Albanian',
    pageCount: 347,
    price: 87.72,
    format: ['Paperback', 'E-Book'],
    authorId: 'ad923796-1ad6-4a1d-88b6-454a04412573'
  },
  {
    _id: '4de24920-044f-4c46-b95a-bd56101174dc',
    title: 'D.O.A.',
    genres: ['Memoir', 'Fiction'],
    publicationDate: '4/20/1994',
    publisher: 'Mydo',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '501039796-X',
    language: 'Dzongkha',
    pageCount: 146,
    price: 26.5,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '5a5c7c5f-8258-433c-aed7-2a498d355659'
  },
  {
    _id: 'dc77f3f7-cf50-4126-b225-005b41504ad4',
    title: 'Just One of the Guys',
    genres: ['History', 'Historical fiction'],
    publicationDate: '11/1/1947',
    publisher: 'Kazu',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '543500590-6',
    language: 'Quechua',
    pageCount: 58,
    price: 0.08,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'd37ec8b9-ba37-4202-ac55-0941cccb6f90'
  },
  {
    _id: '685d6103-6c5f-4bf4-9747-2c0e9ca4f775',
    title: 'Insidious',
    genres: [
      'Historical fiction',
      'History',
      'Families & Relationships',
      'Art'
    ],
    publicationDate: '11/8/1947',
    publisher: 'Oloo',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '483972609-4',
    language: 'Hebrew',
    pageCount: 442,
    price: 80.56,
    format: ['Hardcover', 'E-Book'],
    authorId: '02c0d1d7-45a5-4429-a0aa-374313af1cc5'
  },
  {
    _id: '56319b3b-67d4-4ebc-98f7-e1bcae6171e4',
    title: 'Osama',
    genres: ['Mystery', 'Personal Development', 'Dystopian'],
    publicationDate: '5/31/1959',
    publisher: 'Fiveclub',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '496685614-0',
    language: 'Hindi',
    pageCount: 260,
    price: 4.09,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '5884bd8b-46fb-4fb3-9a39-52acf38b1d3a'
  },
  {
    _id: 'cd2ff008-dddb-4521-8035-fab1e5bd8218',
    title: 'Falling Awake',
    genres: ['Dystopian', 'Travel', 'Thriller', 'Bildungsroman'],
    publicationDate: '4/1/1987',
    publisher: 'Babblestorm',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '333093869-2',
    language: 'Hebrew',
    pageCount: 956,
    price: 63.9,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '75c77358-69d9-41f8-b6d1-760267ee7ebe'
  },
  {
    _id: 'eaa1a0dd-43cf-40a2-a178-b05d4e0eceed',
    title: 'Alien Hunter',
    genres: ['Contemporary', 'Fiction'],
    publicationDate: '4/14/1953',
    publisher: 'Trilith',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '673863384-X',
    language: 'Kannada',
    pageCount: 934,
    price: 2.44,
    format: ['E-Book'],
    authorId: '6b4c20da-9321-413f-97ee-86c3e769eabd'
  },
  {
    _id: 'd88d177d-cdbe-4dd4-ab26-9e629f5decf1',
    title: 'Ghostbusters II',
    genres: ['Thriller', 'Romance', 'Travel'],
    publicationDate: '11/15/2019',
    publisher: 'Devbug',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '784401472-5',
    language: 'Persian',
    pageCount: 640,
    price: 60.96,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'd7e14c9d-4648-4797-bc75-99c29f5bebe3'
  },
  {
    _id: 'f0fdd24c-60ae-402d-bd82-0aa01aaff6e6',
    title: 'River, The (He liu)',
    genres: ['Humor'],
    publicationDate: '12/17/1989',
    publisher: 'Browsebug',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '445328439-X',
    language: 'Punjabi',
    pageCount: 73,
    price: 22.21,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '5fc2ddea-102c-45ad-b6a0-1e1fb4fd6a3d'
  },
  {
    _id: '32a8bfe6-c798-4139-8957-7265045dcfdf',
    title: 'Freezer',
    genres: ['Self-help', 'Families & Relationships', 'Mystery'],
    publicationDate: '2/5/1920',
    publisher: 'Aimbo',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '748747114-4',
    language: 'Hindi',
    pageCount: 24,
    price: 21.52,
    format: ['E-Book', 'Paperback'],
    authorId: '2e3561a6-3e18-4747-8f09-8a7456de98bd'
  },
  {
    _id: 'fb3d8b83-89e7-4d9b-8a7b-15722b4ef21b',
    title: 'Supergirl',
    genres: ['Mystery', 'Fiction', 'Historical fiction', 'Health'],
    publicationDate: '11/30/2002',
    publisher: 'Topicblab',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    isbn: '042401071-2',
    language: 'Hebrew',
    pageCount: 260,
    price: 46.25,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '44661fef-082d-421f-b2c0-b6bc3698d4f5'
  },
  {
    _id: '80b119ed-c22c-439f-b570-7390cae85465',
    title: 'Aelita: The Queen of Mars (Aelita)',
    genres: ['Horror', 'Motivational'],
    publicationDate: '3/20/1921',
    publisher: 'Realmix',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '364551886-X',
    language: 'Kannada',
    pageCount: 27,
    price: 78.18,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '19744cae-ce5c-4c33-94bf-3882aee39f5f'
  },
  {
    _id: 'e41a4983-ffc2-46d6-86fd-1bc9ebfd54f9',
    title: 'Quiet Ones, The',
    genres: ['Memoir', 'Families & Relationships'],
    publicationDate: '4/6/1905',
    publisher: 'Centidel',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '034869191-2',
    language: 'Indonesian',
    pageCount: 638,
    price: 62.1,
    format: ['Paperback'],
    authorId: '42a68549-69e8-48f7-8f49-b4a4e3914ace'
  },
  {
    _id: '87081474-1653-4693-9b92-e67b97c71e1a',
    title: 'The Returned',
    genres: ['Gothic', 'Dystopian', 'Guide / How-to'],
    publicationDate: '6/8/1958',
    publisher: 'Skinder',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '204744538-8',
    language: 'Tsonga',
    pageCount: 881,
    price: 32.47,
    format: ['Paperback'],
    authorId: '32b4a18e-bcc8-49c7-a7ce-2cda6aff382c'
  },
  {
    _id: 'df9debe3-1b1b-4d82-9197-1fcaf0f0e9de',
    title: 'Josephine',
    genres: ['Families & Relationships', 'History'],
    publicationDate: '4/20/1942',
    publisher: 'Fadeo',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '747814382-2',
    language: 'Burmese',
    pageCount: 489,
    price: 72.95,
    format: ['E-Book', 'Paperback'],
    authorId: '365bcc6b-db32-4883-bcc3-f9a62df58ce9'
  },
  {
    _id: 'cedf4269-b7fd-4a81-9030-c648128ada46',
    title: 'Saturn 3',
    genres: ['Self-help', 'Cookbook', 'Bildungsroman'],
    publicationDate: '7/22/1967',
    publisher: 'Izio',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '211472034-9',
    language: 'German',
    pageCount: 492,
    price: 87,
    format: ['E-Book', 'Paperback'],
    authorId: 'fc6c44ff-62cc-4019-8816-00eff3686d31'
  },
  {
    _id: 'c97bf9e9-03b2-4019-908a-c7c9fc56f9ad',
    title: 'B-Side',
    genres: ['Thriller'],
    publicationDate: '5/20/1967',
    publisher: 'Riffpedia',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '171105411-9',
    language: 'Armenian',
    pageCount: 114,
    price: 64.41,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '323edad0-87ac-46b3-b5a3-b0b2ace82293'
  },
  {
    _id: '88a227b6-c454-4925-be65-d5f63a7b3856',
    title: 'Phantom Stagecoach, The',
    genres: ['Southern Gothic Fiction', 'Travel', 'Gothic', 'Paranormal'],
    publicationDate: '8/19/2011',
    publisher: 'Jaxworks',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '323201172-1',
    language: 'Hebrew',
    pageCount: 233,
    price: 53.39,
    format: ['Paperback'],
    authorId: '3e4f3efe-2514-4846-bedb-6c7c86df9b80'
  },
  {
    _id: '48624e5e-c188-4c89-a649-4e67fb4751f5',
    title: 'Metrobranding',
    genres: ['Historical fiction', 'Art', 'Personal Development', 'History'],
    publicationDate: '11/30/1908',
    publisher: 'Kwinu',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '671944783-1',
    language: 'Dzongkha',
    pageCount: 987,
    price: 75.69,
    format: ['E-Book', 'Hardcover'],
    authorId: '9ffaabec-fe9e-4c5e-b81d-054b562d168b'
  },
  {
    _id: 'f5470eaf-6686-4adf-a1be-e7f6281e0220',
    title: 'Pastoral Hide and Seek (Den-en ni shisu)',
    genres: [
      'Romance',
      'Historical fiction',
      'Bildungsroman',
      'Memoir',
      'Families & Relationships'
    ],
    publicationDate: '2/21/1968',
    publisher: 'Ozu',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '086349275-4',
    language: 'Northern Sotho',
    pageCount: 496,
    price: 56.46,
    format: ['Hardcover', 'Paperback'],
    authorId: '1e47b471-5a20-467a-9f06-3b3d77a790b7'
  },
  {
    _id: 'a160d2f1-5b8f-4563-8eed-b6c7b3781682',
    title: 'Jam',
    genres: ['Gothic', 'Contemporary', 'Cookbook'],
    publicationDate: '9/14/1913',
    publisher: 'Thoughtbridge',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '311435981-7',
    language: 'Georgian',
    pageCount: 408,
    price: 9.16,
    format: ['Paperback'],
    authorId: '6eae44cc-641e-4670-9806-5a11d33be649'
  },
  {
    _id: '4efdb199-5a0f-4410-bded-ce07990c6aa4',
    title: 'Glorious Technicolor',
    genres: ['Motivational', 'Art', 'Horror'],
    publicationDate: '5/31/1909',
    publisher: 'Bubblebox',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '088250169-0',
    language: 'Dzongkha',
    pageCount: 219,
    price: 31.91,
    format: ['E-Book'],
    authorId: '1871e6d7-551f-41cb-9a07-08240b86c95c'
  },
  {
    _id: 'cc6877d8-9712-4836-9dd2-5b698e082b8e',
    title: 'My Soul to Take',
    genres: [
      'Science Fiction',
      'Families & Relationships',
      'Horror',
      'Humor',
      'Self-help'
    ],
    publicationDate: '10/31/1959',
    publisher: 'Skivee',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '734633755-7',
    language: 'Gujarati',
    pageCount: 661,
    price: 50.88,
    format: ['Hardcover', 'Paperback'],
    authorId: '36e99f18-8791-4349-a745-8e17467665cf'
  },
  {
    _id: 'f374e2fa-2e13-46c6-8333-76e844a44ef8',
    title: 'Beautiful Joe',
    genres: ['Families & Relationships', 'Historical fiction'],
    publicationDate: '6/30/1927',
    publisher: 'Eire',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '840792694-9',
    language: 'Georgian',
    pageCount: 103,
    price: 95.55,
    format: ['Hardcover'],
    authorId: 'efa93868-002b-4cf5-a332-1a61c642e834'
  },
  {
    _id: 'fb967d7e-58c7-4157-8d50-23e9f9a54bc3',
    title: "Father's Little Dividend",
    genres: [
      'Historical fiction',
      'Gothic',
      'Families & Relationships',
      'Guide / How-to',
      'Paranormal'
    ],
    publicationDate: '10/3/1927',
    publisher: 'Fliptune',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '801801140-0',
    language: 'Assamese',
    pageCount: 6,
    price: 15.59,
    format: ['Hardcover'],
    authorId: '96d8604e-0e99-4bd1-bcc6-1a0800b317c2'
  },
  {
    _id: '25977000-3830-4bb9-8cbc-43775696d33c',
    title: 'Mr. Jealousy',
    genres: ['Cookbook', 'Contemporary', 'Humor'],
    publicationDate: '3/7/1919',
    publisher: 'Miboo',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '458453741-0',
    language: 'Montenegrin',
    pageCount: 82,
    price: 30.36,
    format: ['Paperback'],
    authorId: '882035d5-5704-4d83-8268-013f14bbbb35'
  },
  {
    _id: '42d7b477-3b51-4fe6-bdd4-196ef1090e40',
    title: 'Quid Pro Quo',
    genres: ['Health', 'Thriller', 'Horror', 'Science Fiction'],
    publicationDate: '3/6/1969',
    publisher: 'Twitterbeat',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '014084125-3',
    language: 'Icelandic',
    pageCount: 389,
    price: 60.26,
    format: ['Hardcover', 'E-Book'],
    authorId: 'cf9270bb-52a4-4df9-905b-6af3fb9abc27'
  },
  {
    _id: '5db38de1-dfd0-476c-82c6-9501f6c5206e',
    title: 'Grapes of Wrath, The',
    genres: ['Romance', 'Health', 'Paranormal'],
    publicationDate: '9/15/2012',
    publisher: 'Yotz',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '277561262-8',
    language: 'Fijian',
    pageCount: 195,
    price: 70.13,
    format: ['Hardcover', 'Paperback'],
    authorId: '54d3fa8d-fa45-451f-9f29-d5e35b8c80dd'
  },
  {
    _id: '6c779339-2983-4b99-95b2-16ed2ca94de9',
    title: 'Flashback',
    genres: ['History', 'Motivational'],
    publicationDate: '6/30/1967',
    publisher: 'Dabshots',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '965899896-8',
    language: 'Icelandic',
    pageCount: 132,
    price: 56.23,
    format: ['Hardcover', 'E-Book'],
    authorId: '882035d5-5704-4d83-8268-013f14bbbb35'
  },
  {
    _id: 'eed2cc34-6840-4a1e-8f3e-223e202e8a71',
    title: 'Fear Strikes Out',
    genres: ['Cookbook', 'Art', 'History', 'Mystery'],
    publicationDate: '8/21/1943',
    publisher: 'Tagopia',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '426508210-6',
    language: 'Dutch',
    pageCount: 606,
    price: 75.89,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '4a817c42-ca8c-4be8-8df6-02e99b357a45'
  },
  {
    _id: '444aa782-a87e-40f3-a6ff-e066c6b7b3f1',
    title: 'Short Eyes',
    genres: ['Travel'],
    publicationDate: '5/10/1917',
    publisher: 'Skajo',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '282222967-8',
    language: 'Icelandic',
    pageCount: 232,
    price: 68.39,
    format: ['E-Book'],
    authorId: '92cc5f96-3d5f-4ac8-a0d6-9630f5a02ec8'
  },
  {
    _id: 'e5fe1c3c-446b-4e2a-93c0-1a2e478dc8d6',
    title: 'Dad',
    genres: ['Guide / How-to', 'Travel'],
    publicationDate: '6/6/1925',
    publisher: 'Edgewire',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '595639023-9',
    language: 'Moldovan',
    pageCount: 973,
    price: 98.66,
    format: ['Paperback', 'E-Book'],
    authorId: '2579080f-eb74-4ed3-8167-2e376841407c'
  },
  {
    _id: 'c99608f5-95af-446f-92a8-50700afafe4e',
    title: 'Crude',
    genres: ['Adventure', 'History'],
    publicationDate: '10/8/1918',
    publisher: 'Photobug',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '070056039-4',
    language: 'English',
    pageCount: 415,
    price: 82.77,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '736bc29c-b7d2-4e02-b38a-03cbe1334574'
  },
  {
    _id: '6947d9be-4c29-4d5e-9833-96ed0e9f2ed2',
    title: 'Rampart',
    genres: [
      'Paranormal',
      'Families & Relationships',
      'Southern Gothic Fiction'
    ],
    publicationDate: '1/20/1942',
    publisher: 'Twitternation',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '033238902-2',
    language: 'Norwegian',
    pageCount: 820,
    price: 94.34,
    format: ['Paperback', 'Hardcover'],
    authorId: '4d9851c6-3ce4-4d0f-9331-a61c4198ab8d'
  },
  {
    _id: 'f9d95180-2446-4d38-9590-599551de3333',
    title: 'Diary of a Wimpy Kid: Rodrick Rules',
    genres: [
      'Guide / How-to',
      'Self-help',
      'Art',
      'Families & Relationships',
      'Gothic'
    ],
    publicationDate: '5/7/1913',
    publisher: 'Mycat',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '542892307-5',
    language: 'Montenegrin',
    pageCount: 424,
    price: 87.46,
    format: ['E-Book', 'Paperback'],
    authorId: 'b37b38df-b0ab-4a59-baf0-96e6f9a788c4'
  },
  {
    _id: 'ccb62acd-691e-44b6-a1d3-d6a7d293a4d6',
    title: 'Beaufort',
    genres: ['Paranormal'],
    publicationDate: '10/19/1958',
    publisher: 'Jatri',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '258099865-9',
    language: 'Tetum',
    pageCount: 7,
    price: 19.47,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '757e021b-a7e0-40e4-9e4f-3b944433f545'
  },
  {
    _id: 'a7939f43-2d24-42c9-afe5-04a64576d833',
    title: 'Septième juré, Le',
    genres: ['Contemporary', 'Personal Development', 'History'],
    publicationDate: '11/8/2019',
    publisher: 'Camido',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '925305146-9',
    language: 'Montenegrin',
    pageCount: 945,
    price: 94.16,
    format: ['Hardcover', 'Paperback'],
    authorId: '36f9f627-791c-4476-8a6c-cae6807be704'
  },
  {
    _id: '68262a36-ece2-476c-84e4-d28c83c32020',
    title: 'Rollo and the Woods Sprite (Rölli ja metsänhenki)',
    genres: ['Travel', 'Paranormal', 'Southern Gothic Fiction', 'Cookbook'],
    publicationDate: '6/1/1994',
    publisher: 'Flashdog',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '737176147-2',
    language: 'Malagasy',
    pageCount: 359,
    price: 36.88,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'c9dd26e0-d10a-41fe-b54e-1f50cc288915'
  },
  {
    _id: '642e2de3-4bae-46ab-afd4-00593c3e8287',
    title: 'National Treasure: Book of Secrets',
    genres: ['Health', 'History'],
    publicationDate: '2/28/1915',
    publisher: 'Skipstorm',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '154121014-X',
    language: 'Northern Sotho',
    pageCount: 447,
    price: 23.74,
    format: ['Paperback', 'Hardcover'],
    authorId: 'ba651cf2-8c94-459f-96f6-6a44aa62eb6f'
  },
  {
    _id: '9169d64a-6ca0-47b9-b532-e1d7ca8383f1',
    title: 'Big White, The',
    genres: ['Motivational', 'History', 'Self-help'],
    publicationDate: '8/18/1932',
    publisher: 'Meedoo',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '661931123-7',
    language: 'Danish',
    pageCount: 990,
    price: 95.83,
    format: ['Hardcover'],
    authorId: '53ba42c6-2352-48fa-ba26-50d5b94d020c'
  },
  {
    _id: 'c7434ddc-fc70-4654-9659-212277180a05',
    title: 'Husk',
    genres: ['Southern Gothic Fiction', 'Self-help'],
    publicationDate: '10/17/2001',
    publisher: 'Oba',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    isbn: '002988460-8',
    language: 'Maltese',
    pageCount: 795,
    price: 7.23,
    format: ['E-Book'],
    authorId: 'c9b33d31-b1a0-425a-b2bc-fd9b08014a9f'
  },
  {
    _id: 'd2cf1bd1-931f-4cb4-a9cf-522540cd3d97',
    title: 'Bucktown',
    genres: [
      'Humor',
      'Science Fiction',
      'Personal Development',
      'Families & Relationships'
    ],
    publicationDate: '6/16/1965',
    publisher: 'Latz',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '475465336-X',
    language: 'Punjabi',
    pageCount: 569,
    price: 85.24,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '8413647c-8144-4ccf-bf74-6d217a383d8b'
  },
  {
    _id: '3d3a405b-2d8d-4b96-a34d-242d82d85dfc',
    title: 'Varan the Unbelievable',
    genres: ['Romance', 'Bildungsroman'],
    publicationDate: '3/8/1983',
    publisher: 'Leexo',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '840388446-X',
    language: 'Guaraní',
    pageCount: 519,
    price: 6.02,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'e3cd6df6-103e-4108-bc96-e0d39bd0713f'
  },
  {
    _id: '147768e7-7193-4d57-ad35-73d9283d92dd',
    title: 'Blue Umbrella, The',
    genres: [
      'Guide / How-to',
      'Bildungsroman',
      'Families & Relationships',
      'Romance'
    ],
    publicationDate: '4/28/1995',
    publisher: 'Quatz',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '730532055-2',
    language: 'Czech',
    pageCount: 987,
    price: 26.97,
    format: ['E-Book', 'Paperback'],
    authorId: 'b9adbf2f-9a5f-4e66-bbbc-c46fde950257'
  },
  {
    _id: '6ab1a72a-b93b-40fd-89df-10fcf8c9e2bd',
    title: 'Secrets of the Heart (Secretos del Corazón)',
    genres: ['Science Fiction', 'Health', 'Horror', 'Thriller', 'Romance'],
    publicationDate: '2/19/1956',
    publisher: 'Livepath',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '348373482-1',
    language: 'Moldovan',
    pageCount: 451,
    price: 2.64,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'd6caf59c-f74c-415a-a5c7-d80ecafd1c0b'
  },
  {
    _id: '4313e8b5-c053-487d-9fd1-3ede9e3397cc',
    title: 'King Creole',
    genres: ['Guide / How-to'],
    publicationDate: '12/25/1937',
    publisher: 'Quatz',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '510414295-7',
    language: 'Japanese',
    pageCount: 856,
    price: 54.55,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '15a9dc9d-5c8b-42af-84b2-09aff89b8e56'
  },
  {
    _id: '751211a7-e248-41f5-953e-7effbc411c17',
    title: 'Gotti',
    genres: ['History', 'Fiction', 'Paranormal', 'Art', 'Contemporary'],
    publicationDate: '7/23/1964',
    publisher: 'Dabjam',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '616977986-1',
    language: 'German',
    pageCount: 990,
    price: 92.06,
    format: ['Paperback', 'E-Book'],
    authorId: '3693b60f-d979-4370-89dc-54c243a7c8af'
  },
  {
    _id: 'd374d981-b15b-4fdb-bd83-d54056617fc7',
    title: 'Dr. Crippen',
    genres: ['Travel'],
    publicationDate: '10/20/1929',
    publisher: 'Kamba',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '830225164-X',
    language: 'Yiddish',
    pageCount: 112,
    price: 69.51,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '569d368d-46ef-43d9-aada-b17e655a509f'
  },
  {
    _id: 'a730d965-20c8-4360-b256-1598fbf8419c',
    title: 'Darling',
    genres: ['Adventure', 'Children’s', 'Bildungsroman', 'Self-help'],
    publicationDate: '2/14/1901',
    publisher: 'Riffpath',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '461379702-0',
    language: 'Norwegian',
    pageCount: 719,
    price: 18.28,
    format: ['E-Book'],
    authorId: '8f05cd37-2622-4c6a-a5a7-d9d3b48cb3fe'
  },
  {
    _id: '3f0b8092-23a8-41db-888c-1a0f383d5c33',
    title: 'Candy',
    genres: ['Thriller', 'Bildungsroman'],
    publicationDate: '4/10/1925',
    publisher: 'Flashspan',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '149086026-6',
    language: 'English',
    pageCount: 834,
    price: 21.24,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '27025bc3-36b0-4268-a346-e985f74cab78'
  },
  {
    _id: '9c32f4fe-f01a-4933-a459-202dfd840ee8',
    title: '51 Birch Street',
    genres: ['Cookbook'],
    publicationDate: '12/11/1971',
    publisher: 'Jabbertype',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '089414474-X',
    language: 'Tajik',
    pageCount: 235,
    price: 58.83,
    format: ['E-Book'],
    authorId: 'f4a50447-d8a4-4c16-88f8-95340704c772'
  },
  {
    _id: '8914e24c-fa89-42ee-b223-4890b61680c9',
    title:
      'Enquiring Minds: The Untold Story of the Man Behind the National Enquirer',
    genres: ['Cookbook', 'Personal Development', 'Travel', 'Humor'],
    publicationDate: '6/26/1939',
    publisher: 'Oyoyo',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '982617158-1',
    language: 'Persian',
    pageCount: 679,
    price: 68.9,
    format: ['Paperback'],
    authorId: '5a211082-2ff6-433a-a973-f71fdbed049e'
  },
  {
    _id: '97aba072-578e-4e94-bbb5-e818bcdc6e3e',
    title: 'Sade',
    genres: ['Memoir', 'Travel', 'Motivational'],
    publicationDate: '2/10/1991',
    publisher: 'DabZ',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '763178248-2',
    language: 'Lithuanian',
    pageCount: 420,
    price: 98.72,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '6b4c20da-9321-413f-97ee-86c3e769eabd'
  },
  {
    _id: '6e75fb30-c2bd-4fc7-8686-3465343ae21a',
    title: 'Dear Pillow',
    genres: ['Personal Development'],
    publicationDate: '11/10/1934',
    publisher: 'Camido',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '212143740-1',
    language: 'Thai',
    pageCount: 472,
    price: 91.44,
    format: ['E-Book'],
    authorId: '21781c41-f8c7-41c7-9892-d5e2fb698458'
  },
  {
    _id: 'e474c55d-535d-4288-ab88-c0078ccd0a61',
    title: 'Psycho',
    genres: [
      'Science Fiction',
      'Bildungsroman',
      'Fiction',
      'Personal Development'
    ],
    publicationDate: '7/14/1989',
    publisher: 'Tazzy',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '041891689-6',
    language: 'West Frisian',
    pageCount: 468,
    price: 10.62,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '3693b60f-d979-4370-89dc-54c243a7c8af'
  },
  {
    _id: '49152a05-3a48-4cb5-b15a-4f6146fed803',
    title: 'My Friend Flicka',
    genres: ['Bildungsroman', 'Contemporary', 'Children’s'],
    publicationDate: '7/20/1926',
    publisher: 'Twitterbeat',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '863758186-2',
    language: 'Tok Pisin',
    pageCount: 105,
    price: 18.34,
    format: ['Paperback', 'Hardcover'],
    authorId: '3d5ea1f5-a929-47c0-b92d-b6192fa7ad1e'
  },
  {
    _id: '8d555b93-ccc9-4d51-b6a2-95b03775ca40',
    title: 'Escape from New York',
    genres: ['Horror', 'Motivational', 'Paranormal', 'Health'],
    publicationDate: '7/11/1959',
    publisher: 'Thoughtbeat',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '782222623-1',
    language: 'Khmer',
    pageCount: 390,
    price: 31.85,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'a0e45f04-ca38-4d40-b5ed-d951d3c82712'
  },
  {
    _id: 'c44ef201-93f9-489c-9618-80ee1e9ca4c9',
    title: 'Topaze',
    genres: ['Art', 'Historical fiction'],
    publicationDate: '2/15/2006',
    publisher: 'Quimba',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '444671836-3',
    language: 'Hiri Motu',
    pageCount: 540,
    price: 42.04,
    format: ['Paperback'],
    authorId: 'a5866e42-582e-43e8-869f-2291dab11740'
  },
  {
    _id: 'a1043fe1-e9a4-4802-bee0-f454ec33134a',
    title: 'Across the Pacific',
    genres: ['Memoir', 'Contemporary'],
    publicationDate: '12/30/1966',
    publisher: 'Dynazzy',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '586711308-6',
    language: 'Montenegrin',
    pageCount: 498,
    price: 35.89,
    format: ['Hardcover', 'Paperback'],
    authorId: 'e8fcb35b-2d2d-4af8-8766-11bc06e63a69'
  },
  {
    _id: 'f3a40dae-49ba-4e78-8646-4af0cbbe9cdd',
    title: 'Breezy',
    genres: ['Horror'],
    publicationDate: '5/31/1942',
    publisher: 'Browseblab',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '685842922-0',
    language: 'Tetum',
    pageCount: 365,
    price: 54.15,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '08ea4126-55c9-4669-af5a-3ec5df08d0ca'
  },
  {
    _id: 'd0371af1-b952-4333-b4e7-e2a44e77eb6f',
    title: 'Princess Mononoke (Mononoke-hime)',
    genres: ['Gothic'],
    publicationDate: '2/10/1933',
    publisher: 'LiveZ',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '880140939-7',
    language: 'Amharic',
    pageCount: 913,
    price: 18.8,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '681da636-7226-45cc-bb71-a7441690c4fb'
  },
  {
    _id: '4c4483f1-dc81-49e6-a8c8-c04476d743b3',
    title: 'Brothers on the Line',
    genres: ['Southern Gothic Fiction', 'Dystopian', 'Historical fiction'],
    publicationDate: '8/12/1971',
    publisher: 'Blogspan',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '953202168-X',
    language: 'German',
    pageCount: 796,
    price: 39.28,
    format: ['Paperback'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: '9efd2451-58ee-4432-8cd1-0f31d022da02',
    title: 'Memories of Matsuko (Kiraware Matsuko no isshô)',
    genres: ['Health', 'Dystopian', 'Gothic'],
    publicationDate: '6/21/1947',
    publisher: 'Vipe',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '020570432-8',
    language: 'Japanese',
    pageCount: 365,
    price: 9.19,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'a029f0d8-1914-4e90-a842-8d68a9a130b8'
  },
  {
    _id: '5c48491e-fbc9-422e-b035-02b951991b2c',
    title: 'Island of Dr. Moreau, The',
    genres: ['Gothic'],
    publicationDate: '1/31/1911',
    publisher: 'Realbridge',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '002896941-3',
    language: 'Persian',
    pageCount: 362,
    price: 57.1,
    format: ['E-Book'],
    authorId: '9d71c305-43e5-465f-85ff-17e5b45fb72e'
  },
  {
    _id: '34e5158c-b9de-40e5-8a6f-35ce3ed604cf',
    title: 'My Son John',
    genres: ['Horror'],
    publicationDate: '3/18/1904',
    publisher: 'Jayo',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '098148124-8',
    language: 'Fijian',
    pageCount: 370,
    price: 63.65,
    format: ['Paperback', 'Hardcover'],
    authorId: 'a5866e42-582e-43e8-869f-2291dab11740'
  },
  {
    _id: '0fc296d2-c5d0-45e1-b8b5-974424493526',
    title: 'Prisoner of Zenda, The',
    genres: ['Science Fiction', 'Art', 'History'],
    publicationDate: '1/15/1924',
    publisher: 'Meezzy',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '888134611-7',
    language: 'Tetum',
    pageCount: 372,
    price: 10.34,
    format: ['E-Book', 'Paperback'],
    authorId: 'fc6c44ff-62cc-4019-8816-00eff3686d31'
  },
  {
    _id: '45c4ec62-751e-43da-9ba1-0f3f207aed46',
    title: 'Easy Money',
    genres: ['Travel', 'Bildungsroman', 'Cookbook', 'Romance', 'Adventure'],
    publicationDate: '6/2/1987',
    publisher: 'Gabspot',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '216139279-4',
    language: 'Tok Pisin',
    pageCount: 109,
    price: 84.89,
    format: ['Paperback', 'E-Book'],
    authorId: '569d368d-46ef-43d9-aada-b17e655a509f'
  },
  {
    _id: '9b8b6383-8cbf-4347-a622-58562789bc2a',
    title: "Internes Can't Take Money",
    genres: ['Motivational', 'Southern Gothic Fiction'],
    publicationDate: '2/11/1922',
    publisher: 'Browsebug',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '567370730-4',
    language: 'Yiddish',
    pageCount: 626,
    price: 24.99,
    format: ['E-Book'],
    authorId: '095705f2-38e9-431f-9f75-7a32f09b9107'
  },
  {
    _id: '59009b66-45b0-4eaf-bb08-e5ff1b8568dc',
    title: 'Cheers for Miss Bishop',
    genres: ['Science Fiction'],
    publicationDate: '9/6/1956',
    publisher: 'Trunyx',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '749010212-X',
    language: 'Estonian',
    pageCount: 479,
    price: 79.36,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '0e603c9b-8801-48fe-95ec-312096990ca8'
  },
  {
    _id: '990cf55d-8ccd-4c38-a0b2-e5cba3f87e87',
    title: 'Serrallonga',
    genres: ['Dystopian', 'History'],
    publicationDate: '2/26/1911',
    publisher: 'Dabshots',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '463114647-8',
    language: 'Catalan',
    pageCount: 88,
    price: 3,
    format: ['Paperback', 'Hardcover'],
    authorId: 'd7b5a558-a8ce-4aed-95b4-f9a92f663fb7'
  },
  {
    _id: '7caf2c74-7f6e-4258-8db2-3eb066f1a4b7',
    title: 'Pearl, The (La perla)',
    genres: ['Historical fiction', 'Adventure'],
    publicationDate: '11/19/1940',
    publisher: 'Twitterworks',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '195502081-7',
    language: 'Croatian',
    pageCount: 88,
    price: 79.46,
    format: ['Hardcover'],
    authorId: '49f8e20a-f433-45a9-b3ce-0106fda6bc3e'
  },
  {
    _id: 'b636b0a2-e864-4e05-af63-59e21e41be69',
    title: 'It Happened Tomorrow',
    genres: ['Motivational', 'Paranormal'],
    publicationDate: '4/11/2008',
    publisher: 'Yodoo',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '582656459-8',
    language: 'Portuguese',
    pageCount: 468,
    price: 76.26,
    format: ['Hardcover', 'E-Book'],
    authorId: '145e6abe-f17b-477a-b5d6-9468c69df8b4'
  },
  {
    _id: '4d746158-05bf-4ae2-be97-ec7a1b939a54',
    title: 'Rules of Single Life (Sinkkuelämän säännöt)',
    genres: ['Southern Gothic Fiction', 'Children’s', 'Paranormal'],
    publicationDate: '8/19/1935',
    publisher: 'Tagpad',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '104702643-0',
    language: 'Kurdish',
    pageCount: 682,
    price: 65.91,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '21cb65d1-3f24-4efd-be42-5169707738b4'
  },
  {
    _id: 'c621f88d-1693-497b-bdcb-ebec508eb5c5',
    title: 'Age of Heroes',
    genres: [
      'Thriller',
      'Science Fiction',
      'Guide / How-to',
      'Paranormal',
      'Health'
    ],
    publicationDate: '4/24/2023',
    publisher: 'Rhybox',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '537342441-2',
    language: 'Portuguese',
    pageCount: 823,
    price: 72.21,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '8cfc3b77-0fbe-48c7-84f5-2bd95dc93cd6'
  },
  {
    _id: 'bea5c80e-4657-45b3-81b6-dec85c24d9b2',
    title: 'Born Reckless',
    genres: [
      'Children’s',
      'Families & Relationships',
      'Horror',
      'Southern Gothic Fiction'
    ],
    publicationDate: '10/27/1935',
    publisher: 'Mita',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '490730151-0',
    language: 'Telugu',
    pageCount: 687,
    price: 7.69,
    format: ['Hardcover'],
    authorId: 'fe943a18-1ea9-49ed-a5cd-30967dd95bd2'
  },
  {
    _id: 'd871361a-b708-49c2-8bd0-50e354c642d6',
    title: 'The Mask You Live In',
    genres: ['Horror', 'Self-help', 'Personal Development'],
    publicationDate: '12/31/1911',
    publisher: 'Brainsphere',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '569812705-0',
    language: 'Tamil',
    pageCount: 123,
    price: 3.68,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'e28d16d0-eba7-45cb-96a0-15520fafd03c'
  },
  {
    _id: '4e99ec42-2e38-4efe-8507-a6323d50107f',
    title: 'Heartlands',
    genres: ['Fiction', 'Science Fiction', 'Memoir'],
    publicationDate: '1/11/1987',
    publisher: 'Devpulse',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '327539581-5',
    language: 'German',
    pageCount: 995,
    price: 89.52,
    format: ['Paperback'],
    authorId: 'a08c97cf-b040-4cd6-8eed-c9e1af4cfb35'
  },
  {
    _id: 'eca41e7f-d5a8-46ce-bbde-574097e5e53d',
    title: 'Primer',
    genres: ['Southern Gothic Fiction', 'Health', 'Art'],
    publicationDate: '8/12/1972',
    publisher: 'Youspan',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '686180611-0',
    language: 'Mongolian',
    pageCount: 806,
    price: 99.62,
    format: ['E-Book'],
    authorId: '72b50da8-f16d-4712-8523-b2ba089bd0bd'
  },
  {
    _id: '5fa144b8-a2ba-4bc3-82f5-004a491418f5',
    title: 'Way, The',
    genres: [
      'Health',
      'Southern Gothic Fiction',
      'Self-help',
      'Romance',
      'Humor'
    ],
    publicationDate: '11/4/1992',
    publisher: 'Podcat',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '702805794-1',
    language: 'Luxembourgish',
    pageCount: 266,
    price: 37.81,
    format: ['Hardcover', 'E-Book'],
    authorId: 'b747c2cc-e527-405e-b8a1-ee8c823be501'
  },
  {
    _id: 'd5b62a67-831d-401c-a24f-4639e685d3f2',
    title: 'Samurai I: Musashi Miyamoto (Miyamoto Musashi)',
    genres: ['Motivational', 'Art'],
    publicationDate: '10/11/1909',
    publisher: 'Agimba',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '971752816-0',
    language: 'Northern Sotho',
    pageCount: 410,
    price: 64.61,
    format: ['Hardcover', 'Paperback'],
    authorId: 'b79f7ba2-4c21-4fa9-86d2-ddeaa492a278'
  },
  {
    _id: '1e2e87a3-d752-4065-896b-094da0403d2a',
    title: 'Von Richthofen and Brown',
    genres: ['Paranormal'],
    publicationDate: '5/16/1972',
    publisher: 'Oozz',
    summary: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '608819221-6',
    language: 'Somali',
    pageCount: 263,
    price: 49.64,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'c6ba9f0c-e9e6-4190-a834-115f10349196'
  },
  {
    _id: 'c89ec277-a00d-4fcc-b581-1e4b8ccc3227',
    title: 'New York Confidential',
    genres: ['Historical fiction', 'History', 'Humor'],
    publicationDate: '11/12/2012',
    publisher: 'Abatz',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '301113059-0',
    language: 'Zulu',
    pageCount: 186,
    price: 52.31,
    format: ['E-Book'],
    authorId: '833ffd7f-ba4c-42bb-8671-1f38985707e3'
  },
  {
    _id: '3c2d2bcd-66a8-49e0-a7e3-2cbed2a34efa',
    title: 'Traveller',
    genres: ['Motivational', 'Memoir'],
    publicationDate: '4/24/1924',
    publisher: 'Kayveo',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '152603681-9',
    language: 'Macedonian',
    pageCount: 178,
    price: 25.34,
    format: ['Paperback', 'E-Book'],
    authorId: '0a9bb222-8790-47b0-91b6-95730bd7bb19'
  },
  {
    _id: '9e8aef40-a7fb-4a80-8f7d-b87a5c085288',
    title: 'White Water Summer',
    genres: ['Southern Gothic Fiction', 'Gothic', 'Motivational'],
    publicationDate: '10/31/1970',
    publisher: 'Demivee',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '475930516-5',
    language: 'Portuguese',
    pageCount: 929,
    price: 69.14,
    format: ['Hardcover', 'E-Book'],
    authorId: '3f8bf018-4b09-4f9d-8206-e079ad314a46'
  },
  {
    _id: '8f0f4069-8543-4d3f-84e5-db6bb229d1c8',
    title: 'West of Zanzibar',
    genres: ['Dystopian', 'Bildungsroman', 'Self-help'],
    publicationDate: '8/17/1918',
    publisher: 'Katz',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '021401861-X',
    language: 'Swedish',
    pageCount: 465,
    price: 74.98,
    format: ['Paperback', 'Hardcover'],
    authorId: '7e3561ac-baa5-4657-a822-5e8225f3f860'
  },
  {
    _id: '9ad3cd23-c40f-41b2-91af-261f28281c6a',
    title: 'Divorce of Lady X, The',
    genres: ['Adventure'],
    publicationDate: '12/13/1910',
    publisher: 'Browsetype',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '354310245-1',
    language: 'Tetum',
    pageCount: 761,
    price: 89.72,
    format: ['Hardcover'],
    authorId: '7ac98ce8-e4bf-4e0b-9081-ffb556c0b2a8'
  },
  {
    _id: '81a33bcf-cf75-4686-8352-feac36a42380',
    title: 'All These Women (För att inte tala om alla dessa kvinnor)',
    genres: ['Memoir'],
    publicationDate: '10/30/1921',
    publisher: 'Dabfeed',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '987965758-6',
    language: 'Hiri Motu',
    pageCount: 658,
    price: 48.22,
    format: ['Hardcover', 'E-Book'],
    authorId: 'd9ea6a95-9ea8-4d70-89cc-8abc389aaa80'
  },
  {
    _id: '7484659b-42ff-4ba0-92cd-9942a748fa6b',
    title: 'Last Taboo, The',
    genres: [
      'Contemporary',
      'Families & Relationships',
      'Fiction',
      'Humor',
      'Science Fiction'
    ],
    publicationDate: '3/3/1941',
    publisher: 'Vidoo',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '429706401-4',
    language: 'Croatian',
    pageCount: 998,
    price: 16.82,
    format: ['E-Book'],
    authorId: '986f11aa-d47d-4c25-b140-7bba66ef6ad3'
  },
  {
    _id: '57f3719b-edfe-49e4-b522-dd088d527b50',
    title: 'Umberto D.',
    genres: ['Gothic', 'Cookbook', 'Romance'],
    publicationDate: '11/9/1996',
    publisher: 'Katz',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '345165188-2',
    language: 'Finnish',
    pageCount: 599,
    price: 56.75,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '9f78081d-47dd-4740-b06e-36c00d6dabec'
  },
  {
    _id: 'f8e8eb2a-8a33-4755-b69d-a5cfb2832c25',
    title: 'Admiral',
    genres: ['Memoir', 'Contemporary', 'Mystery', 'Children’s', 'Dystopian'],
    publicationDate: '1/16/1930',
    publisher: 'Realbridge',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '452510015-X',
    language: 'New Zealand Sign Language',
    pageCount: 744,
    price: 58.47,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '833ffd7f-ba4c-42bb-8671-1f38985707e3'
  },
  {
    _id: '06f8577b-02ba-4c20-a0ac-e6a84295cec0',
    title: "Slugger's Wife, The",
    genres: ['Personal Development'],
    publicationDate: '12/28/1977',
    publisher: 'Buzzster',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '448542859-1',
    language: 'Telugu',
    pageCount: 449,
    price: 41.28,
    format: ['E-Book'],
    authorId: '95fddc41-c713-405d-997c-16afcc612de5'
  },
  {
    _id: '34bdf370-8162-4d83-88d4-f01cc0dc715d',
    title: 'Open Road, The',
    genres: [
      'Children’s',
      'Motivational',
      'Contemporary',
      'Personal Development'
    ],
    publicationDate: '2/24/1905',
    publisher: 'Photobug',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '983258527-9',
    language: 'Dari',
    pageCount: 515,
    price: 2.67,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '60456bcb-a2b8-405f-8245-69e4b17a183e'
  },
  {
    _id: '8326d753-a638-496c-943c-9ca0d6031bc6',
    title: 'Secret Adventures of Gustave Klopp, The (Narco)',
    genres: ['Romance', 'Travel'],
    publicationDate: '12/3/1944',
    publisher: 'Brightdog',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '041606363-2',
    language: 'Fijian',
    pageCount: 732,
    price: 94.54,
    format: ['Paperback', 'E-Book'],
    authorId: '58af24c2-21ea-4b9e-903b-54facd8d9b17'
  },
  {
    _id: 'c45a6f6d-b799-4c96-98e8-d197a19b950a',
    title: 'Young Doctors in Love',
    genres: ['Horror', 'Humor', 'Cookbook', 'Bildungsroman', 'Paranormal'],
    publicationDate: '1/4/1912',
    publisher: 'Jabbertype',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '637192004-9',
    language: 'Polish',
    pageCount: 196,
    price: 84.49,
    format: ['Hardcover', 'Paperback'],
    authorId: '04732e53-8b91-471f-a402-b3e767da8790'
  },
  {
    _id: '741eb020-6439-4c6d-8461-97d4880e5b07',
    title: 'Hells Angels on Wheels',
    genres: ['Art', 'Thriller'],
    publicationDate: '11/29/1909',
    publisher: 'Edgepulse',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '753993766-1',
    language: 'Malayalam',
    pageCount: 79,
    price: 73.49,
    format: ['Hardcover', 'Paperback'],
    authorId: '99721619-92e0-44ce-b189-6e09d5d15616'
  },
  {
    _id: 'b050e9b0-482d-4ae8-a436-10797ae36bfb',
    title: 'Synecdoche, New York',
    genres: ['Romance', 'History', 'Fiction', 'Motivational'],
    publicationDate: '11/27/1996',
    publisher: 'Quatz',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '737422346-3',
    language: 'Estonian',
    pageCount: 116,
    price: 95.62,
    format: ['Hardcover'],
    authorId: 'b9e0dee8-7e4b-49f3-a522-8d41ee20adc7'
  },
  {
    _id: '0d56e5be-4c2b-468f-b379-7603ce88dce2',
    title: 'Stolen',
    genres: ['Romance'],
    publicationDate: '8/3/1927',
    publisher: 'Rhyloo',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '732798838-6',
    language: 'Bislama',
    pageCount: 534,
    price: 11.4,
    format: ['E-Book', 'Paperback'],
    authorId: '905af35b-2748-4028-8b91-09185eec7e29'
  },
  {
    _id: 'e25e4897-0744-477a-86f7-8159b8244f3b',
    title: 'Mystic Masseur, The',
    genres: ['Thriller', 'Contemporary'],
    publicationDate: '11/8/2012',
    publisher: 'Wordpedia',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '131850831-2',
    language: 'Hindi',
    pageCount: 390,
    price: 74.55,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '51e0eb6e-7d43-4fd3-8f15-671bb4da1d05'
  },
  {
    _id: '79e2ad62-e552-4b41-8675-798d15739cae',
    title: 'Deadly Friend',
    genres: ['Families & Relationships', 'Memoir', 'Mystery'],
    publicationDate: '2/15/1933',
    publisher: 'Kwimbee',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '102819953-8',
    language: 'Gagauz',
    pageCount: 882,
    price: 95.27,
    format: ['Paperback'],
    authorId: 'bf51dd35-1eb4-4ba7-8ad2-36e726801715'
  },
  {
    _id: 'fbbd0e20-df5f-4453-9314-d5bfe2d6b387',
    title: 'Big City, The (Mahanagar)',
    genres: ['Families & Relationships', 'Cookbook', 'History'],
    publicationDate: '2/20/1982',
    publisher: 'Trilith',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '405523823-1',
    language: 'Tsonga',
    pageCount: 756,
    price: 91.23,
    format: ['Hardcover', 'Paperback'],
    authorId: 'ff133d67-f674-493c-a301-55914ac411e2'
  },
  {
    _id: '05eafc89-7924-4020-9ddd-7b42c09a91d8',
    title: 'Berserk',
    genres: ['Motivational', 'Romance', 'Gothic', 'Science Fiction', 'Horror'],
    publicationDate: '7/15/2008',
    publisher: 'Skidoo',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '009196922-0',
    language: 'Moldovan',
    pageCount: 654,
    price: 4.26,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '2d569bc9-7c5a-4e2a-a747-4cdc02685600'
  },
  {
    _id: '1a195794-45e8-4440-8f46-1286b3698c38',
    title: 'Beyond a Reasonable Doubt',
    genres: ['Health'],
    publicationDate: '10/29/1937',
    publisher: 'Rhyloo',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '428058233-5',
    language: 'Quechua',
    pageCount: 54,
    price: 75.78,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '01b8cdbd-dc58-42c2-8b17-a5f5d7e635a5'
  },
  {
    _id: 'beca8bf9-2a56-4d39-8a99-1775894c9610',
    title: 'Early Spring (Soshun)',
    genres: ['History', 'Southern Gothic Fiction', 'Adventure'],
    publicationDate: '7/2/1940',
    publisher: 'Cogibox',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '062395443-5',
    language: 'Luxembourgish',
    pageCount: 58,
    price: 19.11,
    format: ['Hardcover'],
    authorId: '1cf7e66d-5270-4763-b49a-1631caa80745'
  },
  {
    _id: 'a9c2f93a-db8e-4ffd-abd1-dbc0daca16fe',
    title: 'Obsession',
    genres: ['Travel', 'Children’s', 'Guide / How-to'],
    publicationDate: '12/24/1956',
    publisher: 'Innotype',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '057376552-9',
    language: 'Guaraní',
    pageCount: 296,
    price: 4.26,
    format: ['E-Book'],
    authorId: 'a4bb2a05-b8a2-4476-9d0a-32f49cabd137'
  },
  {
    _id: 'c41fce0c-8f1c-41ed-972e-6a3b3454f03d',
    title: 'Ronal the Barbarian',
    genres: [
      'Travel',
      'Contemporary',
      'Memoir',
      'Motivational',
      'Historical fiction'
    ],
    publicationDate: '3/22/1903',
    publisher: 'Tagopia',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '909102547-6',
    language: 'Mongolian',
    pageCount: 656,
    price: 49.31,
    format: ['Paperback', 'E-Book'],
    authorId: '00296062-6b0d-4f54-aa58-14597d3475c8'
  },
  {
    _id: '9325ce30-4881-4349-8256-773592608051',
    title: 'Always Outnumbered',
    genres: ['Fiction', 'Gothic', 'Bildungsroman'],
    publicationDate: '12/23/1909',
    publisher: 'Jaxbean',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '869326017-0',
    language: 'Dutch',
    pageCount: 862,
    price: 45.25,
    format: ['Paperback', 'Hardcover'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: '0e3ed0cb-723f-48c3-84b3-e17e004c8d0a',
    title: 'Signs of Life (Lebenszeichen)',
    genres: [
      'Motivational',
      'Dystopian',
      'Children’s',
      'Adventure',
      'Paranormal'
    ],
    publicationDate: '11/23/1988',
    publisher: 'Twitterworks',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '520031227-2',
    language: 'Moldovan',
    pageCount: 744,
    price: 66.5,
    format: ['Paperback', 'Hardcover'],
    authorId: '75c77358-69d9-41f8-b6d1-760267ee7ebe'
  },
  {
    _id: 'aab1ff1f-5c4b-4b25-aaf2-8ddaca4778dd',
    title: 'Mantrap',
    genres: ['Contemporary', 'Bildungsroman', 'Personal Development'],
    publicationDate: '3/17/2009',
    publisher: 'Edgeify',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '217210779-4',
    language: 'Hungarian',
    pageCount: 824,
    price: 74.84,
    format: ['Hardcover'],
    authorId: 'b015046f-5b36-4f1a-bec9-e25b8c0a74f6'
  },
  {
    _id: 'a1dd130f-a565-4aee-a70e-c70e6a2c4163',
    title: 'WolfCop',
    genres: ['Dystopian'],
    publicationDate: '11/6/1936',
    publisher: 'Jaxspan',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '284636683-7',
    language: 'Irish Gaelic',
    pageCount: 931,
    price: 79.72,
    format: ['Paperback'],
    authorId: '545f84c0-63d1-419c-a21a-a46d8a189c79'
  },
  {
    _id: '9b270c80-aaeb-44b6-a383-a31e7fc0cf97',
    title: 'Stefano Quantestorie',
    genres: [
      'Mystery',
      'Guide / How-to',
      'History',
      'Families & Relationships'
    ],
    publicationDate: '4/11/1946',
    publisher: 'Youspan',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '206679489-9',
    language: 'Kurdish',
    pageCount: 121,
    price: 76.36,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '96ba8dcc-2e8e-4e6a-86ab-b2bd370c9324'
  },
  {
    _id: 'b9118c4f-24e9-4cd6-9cef-599bd22e6e3a',
    title: 'In the Navy',
    genres: ['Cookbook'],
    publicationDate: '10/31/1948',
    publisher: 'Linkbridge',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '373550129-X',
    language: 'Hindi',
    pageCount: 209,
    price: 22.93,
    format: ['Hardcover'],
    authorId: '90bfbe58-8cd0-4052-9c32-45c611c51e91'
  },
  {
    _id: 'e27689ae-99e5-4f2b-976b-182770f2cdfa',
    title: 'Good Wife, The',
    genres: ['Guide / How-to'],
    publicationDate: '6/28/1948',
    publisher: 'Yotz',
    summary: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '331398993-4',
    language: 'Italian',
    pageCount: 703,
    price: 66,
    format: ['Paperback'],
    authorId: '0c802ad2-5013-4589-8267-034d195a88fe'
  },
  {
    _id: 'fd9c247c-f7c2-4e53-a5f4-07329b15969d',
    title: "Muriel, or The Time of Return (Muriel ou Le temps d'un retour)",
    genres: ['Horror', 'Children’s', 'Personal Development'],
    publicationDate: '1/16/1976',
    publisher: 'Yambee',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '865601234-7',
    language: 'Somali',
    pageCount: 775,
    price: 91.02,
    format: ['Paperback', 'E-Book'],
    authorId: '8603e557-730e-4ce0-8760-6fbcbbc45806'
  },
  {
    _id: 'f204dcb4-e0a8-4136-9f36-df3526428684',
    title: 'Mindscape of Alan Moore, The',
    genres: ['Horror', 'Paranormal'],
    publicationDate: '12/21/2017',
    publisher: 'Camido',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '101838752-8',
    language: 'Nepali',
    pageCount: 82,
    price: 66.54,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'c52ff6f2-cef7-44b0-b04f-d116108819c0'
  },
  {
    _id: '157bbd3a-2343-498b-ac4a-9f1c81c54843',
    title: 'Ben-Hur: A Tale of the Christ',
    genres: ['Travel', 'Southern Gothic Fiction', 'Memoir'],
    publicationDate: '11/6/1962',
    publisher: 'Gigabox',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '160122856-2',
    language: 'Quechua',
    pageCount: 537,
    price: 82.5,
    format: ['E-Book'],
    authorId: 'b1be653b-93b3-4421-bce7-430d6d97f098'
  },
  {
    _id: 'b4c38d5e-5142-48da-9446-186d3b1a3988',
    title: 'Paradise',
    genres: ['Humor', 'Health', 'Fiction', 'Guide / How-to'],
    publicationDate: '8/14/1991',
    publisher: 'Mita',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '590333528-4',
    language: 'Estonian',
    pageCount: 421,
    price: 59.62,
    format: ['E-Book', 'Paperback'],
    authorId: 'de2ce351-11a6-4425-92d6-e51a7f546a7b'
  },
  {
    _id: 'd7600a81-38bd-44b8-82c9-4abbdebcf603',
    title: "Passion of Joan of Arc, The (Passion de Jeanne d'Arc, La)",
    genres: ['Memoir', 'Families & Relationships', 'Mystery'],
    publicationDate: '10/21/1913',
    publisher: 'Youtags',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '726959730-8',
    language: 'Dhivehi',
    pageCount: 540,
    price: 2.35,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'd19b762d-b7ed-436a-babc-ae19344a7483'
  },
  {
    _id: '72d4d0cd-dc47-4213-b853-429d14132609',
    title: 'Eye 2, The (Gin gwai 2)',
    genres: ['Paranormal', 'Art', 'Thriller'],
    publicationDate: '6/26/1942',
    publisher: 'Chatterpoint',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '407875372-8',
    language: 'Pashto',
    pageCount: 733,
    price: 87.91,
    format: ['Paperback', 'Hardcover'],
    authorId: '44661fef-082d-421f-b2c0-b6bc3698d4f5'
  },
  {
    _id: 'b829e1a8-1c7f-4f11-a6c3-6e9769f2c54b',
    title: 'Come September',
    genres: ['Paranormal', 'Motivational', 'Bildungsroman', 'Adventure'],
    publicationDate: '8/17/1924',
    publisher: 'Twinder',
    summary: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '466193706-6',
    language: 'French',
    pageCount: 733,
    price: 99.76,
    format: ['E-Book', 'Paperback'],
    authorId: '2bad735a-d92f-4497-bb53-8f2aef878257'
  },
  {
    _id: '1e9644af-3079-4642-93aa-27fbc46f191a',
    title: 'Bon Cop, Bad Cop',
    genres: ['Bildungsroman', 'Humor', 'Contemporary', 'Mystery'],
    publicationDate: '8/24/1907',
    publisher: 'Skiba',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '260244533-9',
    language: 'Mongolian',
    pageCount: 618,
    price: 66.16,
    format: ['Paperback', 'Hardcover'],
    authorId: '36f9f627-791c-4476-8a6c-cae6807be704'
  },
  {
    _id: 'cf888e6e-a49e-4ae6-8d7d-f1b983067bd4',
    title: 'Travelling Salesman',
    genres: [
      'Children’s',
      'Families & Relationships',
      'Historical fiction',
      'Dystopian'
    ],
    publicationDate: '9/6/1968',
    publisher: 'Meedoo',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '886481407-8',
    language: 'Khmer',
    pageCount: 37,
    price: 45.6,
    format: ['E-Book'],
    authorId: '323edad0-87ac-46b3-b5a3-b0b2ace82293'
  },
  {
    _id: '01eb866c-1690-4bc5-abd2-34acf3309c9f',
    title: 'Godzilla vs. King Ghidorah (Gojira vs. Kingu Gidorâ)',
    genres: ['Southern Gothic Fiction', 'Families & Relationships', 'Art'],
    publicationDate: '5/26/1971',
    publisher: 'Vitz',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '128517325-2',
    language: 'German',
    pageCount: 957,
    price: 42.18,
    format: ['Paperback', 'E-Book'],
    authorId: '6ab99a6b-d96f-4b3b-9402-760e054e3c7d'
  },
  {
    _id: '7229c353-e88e-45b7-99e8-567810f28432',
    title: 'Bed & Breakfast: Love is a Happy Accident (Bed & Breakfast)',
    genres: ['Children’s', 'Horror', 'Bildungsroman'],
    publicationDate: '6/24/1907',
    publisher: 'Cogilith',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '405377156-0',
    language: 'Thai',
    pageCount: 703,
    price: 84.7,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '59d00508-ed3b-44ec-ab33-6629eff4c5ae'
  },
  {
    _id: 'ee3eb33d-f0a7-4fe2-a7be-e0ae130aa83f',
    title: 'Down Argentine Way',
    genres: ['Mystery', 'Southern Gothic Fiction', 'Cookbook'],
    publicationDate: '12/18/1931',
    publisher: 'Fivespan',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '690445737-6',
    language: 'Aymara',
    pageCount: 686,
    price: 28.08,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '745afd57-6c27-41b6-8e24-e7db2f77ba4b'
  },
  {
    _id: 'be4c325a-8892-4fe8-b042-0533bb774611',
    title: 'Alice Upside Down (Alice)',
    genres: ['Self-help', 'Horror', 'Romance'],
    publicationDate: '8/4/1974',
    publisher: 'Devpulse',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '017322297-8',
    language: 'Estonian',
    pageCount: 328,
    price: 63.11,
    format: ['E-Book', 'Paperback'],
    authorId: 'a9dbdd11-e458-4039-879d-3dd2ad3b79a3'
  },
  {
    _id: '4322af20-3a9a-4cd0-9748-13379fb8dc58',
    title: 'Woodstock',
    genres: ['History', 'Dystopian', 'Humor'],
    publicationDate: '5/23/1954',
    publisher: 'Feednation',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '140275651-8',
    language: 'Amharic',
    pageCount: 348,
    price: 76.5,
    format: ['Paperback', 'Hardcover'],
    authorId: 'dcc3ecde-e73e-438f-8753-64a6508b9f90'
  },
  {
    _id: '2a75552e-c65f-47fe-84fa-104ff8c22657',
    title: 'Night of the Zombies (a.k.a. Batallion of the Living Dead)',
    genres: [
      'Families & Relationships',
      'Personal Development',
      'Art',
      'Bildungsroman'
    ],
    publicationDate: '5/23/1970',
    publisher: 'InnoZ',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '931650675-1',
    language: 'Korean',
    pageCount: 935,
    price: 1.01,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'a0e45f04-ca38-4d40-b5ed-d951d3c82712'
  },
  {
    _id: 'd1b0f747-e45c-4f7f-9d7e-e5ee1262312b',
    title: 'Ernest Film Festival, The',
    genres: ['Guide / How-to', 'Gothic', 'Thriller'],
    publicationDate: '4/13/1967',
    publisher: 'Shuffledrive',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '019909715-1',
    language: 'Malagasy',
    pageCount: 550,
    price: 27.93,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '3da1856a-3072-493d-8f30-77e3381a9f1d'
  },
  {
    _id: '3f01c00e-dd02-4873-8036-7ebccb530e97',
    title: 'Fanny and Alexander (Fanny och Alexander)',
    genres: ['Mystery', 'Children’s', 'History', 'Contemporary', 'Adventure'],
    publicationDate: '8/20/1922',
    publisher: 'Vitz',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '289685859-8',
    language: 'Guaraní',
    pageCount: 921,
    price: 73.73,
    format: ['E-Book'],
    authorId: 'eb541d9a-16ea-47f9-ae36-1ba6bcfa7494'
  },
  {
    _id: 'd2ac3c29-d7be-4c53-bc9e-db90cc3d7b92',
    title: 'Woman in The Septic Tank, The (Ang Babae sa septic tank)',
    genres: ['Historical fiction'],
    publicationDate: '1/2/1919',
    publisher: 'Jaxnation',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '207918945-X',
    language: 'Indonesian',
    pageCount: 868,
    price: 51.25,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '4e3a47a8-a6db-4c2b-8ecb-45fc2fefaabf'
  },
  {
    _id: 'db3d48e7-f9a7-4c7e-ae3c-0afc39db3227',
    title: 'Man Called Adam, A',
    genres: ['Motivational', 'Fiction', 'Horror', 'Science Fiction', 'Travel'],
    publicationDate: '8/2/1964',
    publisher: 'Flashset',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '134345132-9',
    language: 'Tamil',
    pageCount: 636,
    price: 47.46,
    format: ['Hardcover', 'Paperback'],
    authorId: '36e99f18-8791-4349-a745-8e17467665cf'
  },
  {
    _id: '9d592661-fc95-44a2-9d17-bbc19bfb2bb7',
    title: 'Rocky Saga: Going the Distance, The',
    genres: ['Memoir', 'Bildungsroman', 'Motivational'],
    publicationDate: '3/12/1925',
    publisher: 'Brainbox',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '192001346-6',
    language: 'French',
    pageCount: 398,
    price: 86.35,
    format: ['Hardcover', 'Paperback'],
    authorId: 'f8663cff-35e8-48e3-ad3e-07aff658083d'
  },
  {
    _id: 'bd680d08-e8cc-4f69-b718-ce5c3b3f7953',
    title: 'Torso',
    genres: ['Fiction', 'Thriller', 'Horror', 'Science Fiction', 'Dystopian'],
    publicationDate: '11/12/1968',
    publisher: 'Oodoo',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '608428201-6',
    language: 'Nepali',
    pageCount: 52,
    price: 75.97,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '4c2c0950-ba00-4da9-95df-373a648d02af'
  },
  {
    _id: 'c0a33800-8205-4ac5-9aa8-b8c4e2cc1768',
    title: 'Manhattan',
    genres: ['Health', 'Paranormal', 'History'],
    publicationDate: '3/10/1936',
    publisher: 'Plajo',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '452760554-2',
    language: 'Georgian',
    pageCount: 308,
    price: 45.8,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'fe943a18-1ea9-49ed-a5cd-30967dd95bd2'
  },
  {
    _id: '837a7f30-ad62-401b-9b09-e2f4a46f6266',
    title: 'Miss Violence',
    genres: ['Guide / How-to', 'Humor'],
    publicationDate: '9/22/1995',
    publisher: 'Youtags',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '475410333-5',
    language: 'Punjabi',
    pageCount: 717,
    price: 18.49,
    format: ['E-Book'],
    authorId: '7ac98ce8-e4bf-4e0b-9081-ffb556c0b2a8'
  },
  {
    _id: 'cdd99be3-5359-422d-9a83-3cc04a650802',
    title: 'Snakes on a Plane',
    genres: ['Motivational', 'Travel', 'Cookbook', 'Art', 'Science Fiction'],
    publicationDate: '4/11/1989',
    publisher: 'Babblestorm',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '954048516-9',
    language: 'Romanian',
    pageCount: 330,
    price: 9.73,
    format: ['Paperback'],
    authorId: '140bb64f-c2ca-4250-97a7-7d5c395d1ea2'
  },
  {
    _id: 'd757ea56-9379-4e2f-9210-b37d41044916',
    title: 'Naked Blood: Megyaku (Nekeddo burâddo: Megyaku)',
    genres: [
      'Southern Gothic Fiction',
      'Cookbook',
      'Fiction',
      'Families & Relationships'
    ],
    publicationDate: '11/7/1990',
    publisher: 'Yambee',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '633256561-6',
    language: 'Italian',
    pageCount: 227,
    price: 11.76,
    format: ['E-Book', 'Hardcover'],
    authorId: 'a9dbdd11-e458-4039-879d-3dd2ad3b79a3'
  },
  {
    _id: 'f892f4af-ba32-4306-8e72-3b414f6820a1',
    title: 'Kikujiro (Kikujirô no natsu)',
    genres: ['History', 'Romance', 'Horror', 'Self-help'],
    publicationDate: '6/17/2002',
    publisher: 'Reallinks',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '049094218-0',
    language: 'Bosnian',
    pageCount: 811,
    price: 81.47,
    format: ['Hardcover'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: 'b1c1ff3c-b2e5-4318-8ef9-189b7dd8b0ef',
    title: 'Bachelorette',
    genres: ['Travel', 'Contemporary', 'Historical fiction'],
    publicationDate: '10/7/2020',
    publisher: 'Chatterbridge',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '022488117-5',
    language: 'Indonesian',
    pageCount: 222,
    price: 5.42,
    format: ['E-Book', 'Hardcover'],
    authorId: 'bfcd785c-5c08-4410-b5e3-fa286931ff0b'
  },
  {
    _id: '75253ba6-daab-4a83-a634-39dea1eb404e',
    title: 'Wild Grass (Herbes folles, Les)',
    genres: ['Motivational', 'Cookbook', 'Science Fiction', 'History'],
    publicationDate: '1/9/1963',
    publisher: 'Leexo',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '449141610-9',
    language: 'Burmese',
    pageCount: 665,
    price: 91.82,
    format: ['Paperback'],
    authorId: '4825d81f-42c5-4bee-810b-4ae6f917067e'
  },
  {
    _id: '4565a90d-8d77-457e-aab4-a37e4312c3c6',
    title: 'Jamie Marks Is Dead',
    genres: ['Romance', 'Humor'],
    publicationDate: '4/24/1952',
    publisher: 'Browsedrive',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '447111480-8',
    language: 'Swedish',
    pageCount: 516,
    price: 3.93,
    format: ['Hardcover'],
    authorId: 'ad923796-1ad6-4a1d-88b6-454a04412573'
  },
  {
    _id: '437b6d7c-a75d-4c30-bc41-888c96f9da64',
    title: 'Steam',
    genres: ['Science Fiction', 'Travel', 'Memoir', 'Dystopian', 'Thriller'],
    publicationDate: '4/30/1902',
    publisher: 'Jabberbean',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '707955347-4',
    language: 'Dzongkha',
    pageCount: 708,
    price: 18.64,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '86abb841-936f-4afe-bce9-73199f45565f'
  },
  {
    _id: 'cb6667b9-217a-4ba5-848b-080f60cdb36d',
    title:
      "Bandit: Bandit's Silver Angel (Smokey and the Bandit 7) (Bandit: Bandit and the Silver Angel)",
    genres: ['Health', 'Personal Development', 'Paranormal'],
    publicationDate: '7/4/1971',
    publisher: 'Rooxo',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '738889686-4',
    language: 'English',
    pageCount: 227,
    price: 55.16,
    format: ['Paperback', 'Hardcover'],
    authorId: '859b661c-1761-42bc-87e3-93ed892a1dd8'
  },
  {
    _id: '9c3b6f35-7fa2-459c-bb44-6cd0749b4a3d',
    title: 'McQ',
    genres: ['Bildungsroman', 'Art'],
    publicationDate: '3/30/1946',
    publisher: 'Yacero',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '540412918-2',
    language: 'West Frisian',
    pageCount: 396,
    price: 83.43,
    format: ['Hardcover'],
    authorId: '5a5c7c5f-8258-433c-aed7-2a498d355659'
  },
  {
    _id: '2f8d9f55-be33-4220-92f4-1156a8679734',
    title: 'Everyone Else (Alle Anderen)',
    genres: ['Dystopian', 'Science Fiction', 'Travel'],
    publicationDate: '9/16/1970',
    publisher: 'Agimba',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '690420126-6',
    language: 'Romanian',
    pageCount: 845,
    price: 22.69,
    format: ['Hardcover'],
    authorId: '305ec477-b0ba-481c-a4b5-11696902ce6c'
  },
  {
    _id: '66f56439-63a5-47ac-b276-30f447863198',
    title: 'Evocateur: The Morton Downey Jr. Movie',
    genres: ['Humor', 'Fiction'],
    publicationDate: '11/2/1994',
    publisher: 'Yodoo',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '893124772-9',
    language: 'Kyrgyz',
    pageCount: 692,
    price: 48.81,
    format: ['Hardcover'],
    authorId: 'cdf048ac-6874-45e9-8a93-2f561c22ed4e'
  },
  {
    _id: '38a628e5-8f0a-4d7c-8152-a6004d025b11',
    title: 'Lost Boundaries',
    genres: ['Contemporary', 'Gothic'],
    publicationDate: '3/26/1915',
    publisher: 'Photobug',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '334208477-4',
    language: 'Malagasy',
    pageCount: 886,
    price: 27.42,
    format: ['Paperback'],
    authorId: '3e0a8487-426a-4866-85bc-33db5cad2ad0'
  },
  {
    _id: 'b606f4cf-47b8-43f3-8b5a-392ed257583a',
    title: 'Way Ahead, The (a.k.a. The Immortal Battalion)',
    genres: ['Dystopian', 'Mystery', 'Children’s'],
    publicationDate: '11/29/1925',
    publisher: 'Aimbo',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '802172547-8',
    language: 'Telugu',
    pageCount: 425,
    price: 21.88,
    format: ['Hardcover', 'E-Book'],
    authorId: 'a62686d4-f556-42ca-9ad7-8443e1a8d285'
  },
  {
    _id: 'fb4a1732-b261-49df-aa34-0b4a0432a271',
    title: 'Love Crazy',
    genres: ['Children’s', 'Horror', 'Motivational'],
    publicationDate: '9/3/1948',
    publisher: 'Vimbo',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '250722649-8',
    language: 'Dari',
    pageCount: 432,
    price: 87.16,
    format: ['Paperback', 'E-Book'],
    authorId: '03bc2e14-c55d-4e31-a183-d1f6ffdc1638'
  },
  {
    _id: '13047538-818c-4c30-905d-e8ef026f47b1',
    title: 'Rolling Thunder',
    genres: ['History'],
    publicationDate: '10/5/1972',
    publisher: 'Reallinks',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '256178331-6',
    language: 'Somali',
    pageCount: 774,
    price: 12.68,
    format: ['Hardcover', 'E-Book'],
    authorId: '3d5ea1f5-a929-47c0-b92d-b6192fa7ad1e'
  },
  {
    _id: 'a627470f-6c65-4137-8783-b0f88ac6a419',
    title: "He Knows You're Alone (a.k.a. Blood Wedding)",
    genres: ['Memoir', 'Art', 'Paranormal', 'Health', 'Gothic'],
    publicationDate: '2/3/1900',
    publisher: 'Viva',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '825878821-3',
    language: 'Northern Sotho',
    pageCount: 964,
    price: 6.77,
    format: ['Hardcover'],
    authorId: '726687ee-c728-4022-818e-0fb9384d4ed6'
  },
  {
    _id: 'ed48d529-8e22-434e-8fc8-7b2d357f8058',
    title: 'Eden Log',
    genres: ['Art'],
    publicationDate: '1/6/1987',
    publisher: 'Mybuzz',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '575890731-6',
    language: 'Gujarati',
    pageCount: 908,
    price: 94.25,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '83a8878d-d10e-4c3d-adc5-ed88487d1888'
  },
  {
    _id: '5f4604b4-fadf-40f7-b268-8c0cd9562f21',
    title: '13 Ghosts',
    genres: ['Cookbook', 'Southern Gothic Fiction', 'Fiction'],
    publicationDate: '3/18/2023',
    publisher: 'Topicshots',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '573900710-0',
    language: 'Malay',
    pageCount: 413,
    price: 99.25,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '81c74c34-9bc4-4f0e-bd73-6138cf29b38d'
  },
  {
    _id: 'e38ce396-176e-4516-97da-7ec894ac02d0',
    title: 'Adventures of Huck Finn, The',
    genres: ['Bildungsroman'],
    publicationDate: '8/17/1971',
    publisher: 'Aibox',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '928759971-8',
    language: 'Swati',
    pageCount: 293,
    price: 63.6,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '27bc84d7-bd36-4bc2-9508-843db5d5de37'
  },
  {
    _id: '48f597f9-8bb8-4747-b2e0-8887de0eaafa',
    title: 'Gabrielle',
    genres: [
      'Guide / How-to',
      'Motivational',
      'Gothic',
      'Historical fiction',
      'Thriller'
    ],
    publicationDate: '12/16/1909',
    publisher: 'Meevee',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '057378410-8',
    language: 'Quechua',
    pageCount: 945,
    price: 14.04,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'c9b33d31-b1a0-425a-b2bc-fd9b08014a9f'
  },
  {
    _id: '76c0bdcc-f280-4d4e-b129-4f7dd750569b',
    title:
      'Tale of Zatoichi Continues, The (Zoku Zatôichi monogatari) (Zatôichi 2)',
    genres: ['Memoir', 'History', 'Horror', 'Art'],
    publicationDate: '12/3/1989',
    publisher: 'Rhyloo',
    summary: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '405474018-9',
    language: 'Filipino',
    pageCount: 428,
    price: 5.21,
    format: ['Hardcover', 'Paperback'],
    authorId: 'dca95873-95d1-4b6f-a3ec-18a2e3c72f6c'
  },
  {
    _id: 'bf1bbeb9-ee11-42f2-bbec-a8bc2bbd7269',
    title: 'Maelström',
    genres: ['Science Fiction', 'Contemporary', 'Dystopian'],
    publicationDate: '10/5/2009',
    publisher: 'Edgewire',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '577560468-7',
    language: 'Montenegrin',
    pageCount: 967,
    price: 37.26,
    format: ['Paperback'],
    authorId: 'e465ba22-78a0-473a-aa6e-4dc28a031fbf'
  },
  {
    _id: '5a672a3b-b450-4170-b003-4baaff402776',
    title: 'Kill Me Please',
    genres: ['Self-help'],
    publicationDate: '8/23/1940',
    publisher: 'Yakitri',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '775947536-5',
    language: 'Swedish',
    pageCount: 436,
    price: 74.72,
    format: ['E-Book', 'Hardcover'],
    authorId: '1b6f0c27-ab49-4783-a19a-9a8ab718292b'
  },
  {
    _id: '431d0b7f-cfab-4b1b-ba11-bfcecfaf1821',
    title: 'Kai Po Che!',
    genres: ['Gothic', 'Science Fiction', 'Horror'],
    publicationDate: '2/4/1904',
    publisher: 'Youbridge',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '079338695-0',
    language: 'Macedonian',
    pageCount: 578,
    price: 91.61,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '34388794-db0d-4545-b944-874bb3ef81c7'
  },
  {
    _id: 'a300954f-6f58-4407-865c-1ecd042d4952',
    title: 'Glen or Glenda',
    genres: [
      'Children’s',
      'Personal Development',
      'Thriller',
      'History',
      'Gothic'
    ],
    publicationDate: '9/11/1952',
    publisher: 'Kwilith',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '216060390-2',
    language: 'Marathi',
    pageCount: 516,
    price: 40.77,
    format: ['Paperback'],
    authorId: 'f3e25d49-92b1-46eb-b084-4d43a01bad23'
  },
  {
    _id: 'c006b0bd-f8d4-40ac-b083-d6071d537cf6',
    title: 'West of Zanzibar',
    genres: ['Historical fiction', 'Health'],
    publicationDate: '5/20/1971',
    publisher: 'Lazzy',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '691139693-X',
    language: 'Portuguese',
    pageCount: 142,
    price: 7.11,
    format: ['Paperback', 'E-Book'],
    authorId: '2bad735a-d92f-4497-bb53-8f2aef878257'
  },
  {
    _id: 'f6bc1d60-fba3-4b12-926d-ef1cce518335',
    title: 'Billabong Odyssey',
    genres: ['Contemporary', 'Fiction', 'Horror'],
    publicationDate: '10/14/1946',
    publisher: 'Youfeed',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '604697871-8',
    language: 'Dzongkha',
    pageCount: 273,
    price: 77.04,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'f4a50447-d8a4-4c16-88f8-95340704c772'
  },
  {
    _id: '23de89cf-c91b-4e62-b57d-ad62d6790f46',
    title: 'Proud and the Beautiful, The (Orgueilleux, Les) (Proud Ones, The)',
    genres: ['Historical fiction', 'Mystery'],
    publicationDate: '5/11/2015',
    publisher: 'Thoughtbeat',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '543347248-5',
    language: 'Luxembourgish',
    pageCount: 647,
    price: 67.33,
    format: ['E-Book', 'Paperback'],
    authorId: '259bc2c1-2fcb-44a9-b3a4-ac6ca89a7e2c'
  },
  {
    _id: 'd7a8fda5-056b-49fb-b6ce-8a83481da37a',
    title: 'Trancers II',
    genres: [
      'Children’s',
      'Families & Relationships',
      'Motivational',
      'Fiction',
      'Contemporary'
    ],
    publicationDate: '5/23/2022',
    publisher: 'Yata',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '775649461-X',
    language: 'Punjabi',
    pageCount: 138,
    price: 59.68,
    format: ['Paperback'],
    authorId: '3e877cfc-89d2-426f-9f9c-b369a04eb4c7'
  },
  {
    _id: '28f5939e-aacd-447a-ab4c-6f94f27f7190',
    title: 'Someone Like You (Unnaipol Oruvan)',
    genres: ['Horror', 'Historical fiction', 'Motivational', 'Adventure'],
    publicationDate: '1/29/1999',
    publisher: 'Mydo',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '076976794-X',
    language: 'Malayalam',
    pageCount: 924,
    price: 38.38,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '7cdbc5ad-12b8-428d-9ab8-57d117328403'
  },
  {
    _id: '6d09cb6b-3f87-45a9-8d67-970b3b710b9d',
    title: 'Tristan & Isolde',
    genres: ['Science Fiction', 'Art', 'Personal Development', 'Dystopian'],
    publicationDate: '12/12/1932',
    publisher: 'Twitterlist',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '721492144-8',
    language: 'Chinese',
    pageCount: 549,
    price: 82.72,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '2f384f94-3958-4894-a2d3-5eaa1a8ee8f3'
  },
  {
    _id: '45772165-862d-4e41-ab36-450c9dc7e0e0',
    title: 'To Encourage the Others',
    genres: ['Romance', 'Mystery'],
    publicationDate: '4/1/1970',
    publisher: 'Fadeo',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '682508170-5',
    language: 'Dzongkha',
    pageCount: 296,
    price: 42,
    format: ['Paperback', 'E-Book'],
    authorId: '7a71d1b2-5ff1-4b47-a861-9c4089c6b768'
  },
  {
    _id: 'fb2aac79-d62a-4b9d-98c8-fbf428ee5c9e',
    title: 'Contract, The',
    genres: ['Gothic', 'Families & Relationships', 'Cookbook'],
    publicationDate: '11/22/2007',
    publisher: 'Thoughtsphere',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '876001177-7',
    language: 'Malayalam',
    pageCount: 651,
    price: 86.04,
    format: ['E-Book'],
    authorId: 'b9adbf2f-9a5f-4e66-bbbc-c46fde950257'
  },
  {
    _id: '39a00b44-6297-4cac-859d-2407a85c3858',
    title:
      'Crying Out Love in the Center of the World (Sekai no chûshin de, ai o sakebu)',
    genres: ['Southern Gothic Fiction', 'Health', 'Fiction', 'Art', 'History'],
    publicationDate: '7/11/1932',
    publisher: 'Brightdog',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '249762495-X',
    language: 'Malayalam',
    pageCount: 121,
    price: 99.65,
    format: ['E-Book'],
    authorId: 'b015046f-5b36-4f1a-bec9-e25b8c0a74f6'
  },
  {
    _id: '3322696a-6e01-4ddf-8304-28781d86de29',
    title: 'I Love Trouble',
    genres: [
      'History',
      'Motivational',
      'Adventure',
      'Southern Gothic Fiction',
      'Paranormal'
    ],
    publicationDate: '6/27/1960',
    publisher: 'Avamba',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '974805258-3',
    language: 'Croatian',
    pageCount: 216,
    price: 41.79,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '3fe6ba2c-45af-4c96-a607-91aa273eb41b'
  },
  {
    _id: '0dcf7670-2564-490d-bd31-6208a655648b',
    title: 'One Good Cop',
    genres: ['Paranormal'],
    publicationDate: '4/23/1934',
    publisher: 'Brightdog',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '754987827-7',
    language: 'Hindi',
    pageCount: 159,
    price: 45.13,
    format: ['Hardcover', 'E-Book'],
    authorId: 'e2f25558-3670-4245-a14c-96411334340c'
  },
  {
    _id: '33d4a7f6-fd79-40e3-8c55-db381748fbf5',
    title: "Fathers' Day",
    genres: ['Humor', 'Travel', 'Science Fiction', 'Children’s'],
    publicationDate: '9/19/1910',
    publisher: 'Meevee',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '965079661-4',
    language: 'Armenian',
    pageCount: 38,
    price: 40.24,
    format: ['E-Book'],
    authorId: '52c6e175-5bf4-4671-ac86-665e4dc54901'
  },
  {
    _id: '6c061392-7488-4693-a581-1a0586e28ed1',
    title: 'Stardom',
    genres: [
      'Adventure',
      'Historical fiction',
      'History',
      'Fiction',
      'Paranormal'
    ],
    publicationDate: '3/28/2020',
    publisher: 'Zoomdog',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '120405119-4',
    language: 'Pashto',
    pageCount: 663,
    price: 3.64,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '3e4f3efe-2514-4846-bedb-6c7c86df9b80'
  },
  {
    _id: '22f2e5f3-5e8a-4966-a6a2-ca029f5fb215',
    title: 'Heartbreakers',
    genres: ['Southern Gothic Fiction', 'Self-help', 'Dystopian'],
    publicationDate: '4/5/1926',
    publisher: 'Topicshots',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '001970652-9',
    language: 'Greek',
    pageCount: 447,
    price: 21.44,
    format: ['Hardcover', 'Paperback'],
    authorId: '21d34ada-c6e8-4b30-a25e-399eacb27ef9'
  },
  {
    _id: '010198a8-233c-42c5-8315-841d7569a349',
    title: 'Rise of the Zombies',
    genres: ['Contemporary', 'Guide / How-to'],
    publicationDate: '7/11/1989',
    publisher: 'Brightdog',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '829902358-0',
    language: 'Malagasy',
    pageCount: 396,
    price: 7.64,
    format: ['Paperback', 'Hardcover'],
    authorId: '5a5c7c5f-8258-433c-aed7-2a498d355659'
  },
  {
    _id: 'ee367928-0a10-43fd-8bcf-3c3bec24fd99',
    title: 'Beekeeper, The (O melissokomos)',
    genres: ['Dystopian', 'Bildungsroman', 'Health', 'Horror'],
    publicationDate: '8/25/1982',
    publisher: 'Voonix',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '702520479-X',
    language: 'Malagasy',
    pageCount: 89,
    price: 25.79,
    format: ['Hardcover', 'E-Book'],
    authorId: '23896b07-323f-4865-99fb-cb2f5ee11881'
  },
  {
    _id: 'c21e58ad-e047-4aa1-8c33-f0ba1505d8fc',
    title: 'Crocodile Dundee in Los Angeles',
    genres: ['Travel', 'Thriller', 'Contemporary', 'Historical fiction'],
    publicationDate: '10/20/2009',
    publisher: 'Blogtags',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '289487448-0',
    language: 'Icelandic',
    pageCount: 705,
    price: 9.9,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'e04c2206-7738-416e-ab72-aa7d846adbac'
  },
  {
    _id: '2544b20e-e60c-43c4-b2c9-e54e7bce5ae5',
    title: 'Scientist, The',
    genres: ['Personal Development', 'Science Fiction'],
    publicationDate: '4/19/1946',
    publisher: 'Babbleset',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '132138574-9',
    language: 'Kyrgyz',
    pageCount: 380,
    price: 24.64,
    format: ['E-Book', 'Hardcover'],
    authorId: '948987d5-13ce-4725-988b-105c05ece819'
  },
  {
    _id: '3d4d14a9-3514-4088-87cb-0202c2a4527d',
    title: 'Sordid Lives',
    genres: ['Romance', 'Art', 'Paranormal'],
    publicationDate: '12/10/1974',
    publisher: 'Skajo',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '846064051-5',
    language: 'Aymara',
    pageCount: 73,
    price: 81.97,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '9ab6487c-31f9-4b8f-8010-b6104fff041b'
  },
  {
    _id: '1a88faae-2cb5-46b0-b82b-7a7b87231ae1',
    title: "Passionate Friends, The (a.k.a. One Woman's Story)",
    genres: ['Gothic', 'Guide / How-to'],
    publicationDate: '4/9/1908',
    publisher: 'Wikizz',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '232265383-7',
    language: 'Punjabi',
    pageCount: 112,
    price: 49.91,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '3693b60f-d979-4370-89dc-54c243a7c8af'
  },
  {
    _id: '454fdd8e-0e71-4c33-916b-a62644bff991',
    title: 'Rapture-Palooza',
    genres: ['Memoir', 'Self-help', 'Fiction', 'Historical fiction'],
    publicationDate: '11/15/1957',
    publisher: 'Kanoodle',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '982178729-0',
    language: 'Swati',
    pageCount: 769,
    price: 41.27,
    format: ['E-Book', 'Hardcover'],
    authorId: '0d2f602a-882e-4850-b564-8101e1e871af'
  },
  {
    _id: '776621d0-90ba-47f4-83aa-a816a603da64',
    title: 'Angels in the Outfield',
    genres: ['Gothic'],
    publicationDate: '7/28/1964',
    publisher: 'Meetz',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '038317446-5',
    language: 'Kyrgyz',
    pageCount: 321,
    price: 89.46,
    format: ['Hardcover'],
    authorId: 'b015046f-5b36-4f1a-bec9-e25b8c0a74f6'
  },
  {
    _id: 'fc67b542-7d9f-4e4b-bd25-c8d44d2a4af7',
    title: 'Dinner for Schmucks',
    genres: ['Health', 'Humor', 'Romance', 'Gothic', 'Fiction'],
    publicationDate: '12/12/2019',
    publisher: 'Skynoodle',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '532028106-4',
    language: 'Malay',
    pageCount: 710,
    price: 13.59,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '8b4128b2-cf2a-40e2-9130-9899c17853eb'
  },
  {
    _id: 'd00c78a7-1de8-4a9c-8342-6a92fe872706',
    title: 'My Sons (Musuko)',
    genres: ['History', 'Children’s'],
    publicationDate: '6/18/1961',
    publisher: 'Babblestorm',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '834764088-2',
    language: 'Sotho',
    pageCount: 396,
    price: 35.97,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'a7da4a33-75a6-4059-83a6-493c1117fce2'
  },
  {
    _id: '2ec4d80d-ea80-4a9f-900d-cfa60be0d8cb',
    title: 'Calloused Hands',
    genres: ['Art', 'Travel', 'Contemporary'],
    publicationDate: '9/11/2008',
    publisher: 'Oloo',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '732620841-7',
    language: 'Northern Sotho',
    pageCount: 283,
    price: 27.29,
    format: ['Hardcover', 'E-Book'],
    authorId: '4a817c42-ca8c-4be8-8df6-02e99b357a45'
  },
  {
    _id: '18a396c8-0859-47c4-8e4d-dca7b054ad9b',
    title: 'ABCs of Death, The',
    genres: ['Fiction', 'Gothic', 'Adventure', 'Personal Development'],
    publicationDate: '2/7/1955',
    publisher: 'Livepath',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '317561212-1',
    language: 'Belarusian',
    pageCount: 435,
    price: 17.57,
    format: ['Paperback', 'Hardcover'],
    authorId: '41f61915-3942-4d1b-9a8d-6b4d6f31def3'
  },
  {
    _id: 'a98d2c97-ef2e-4e83-a25f-949249223c66',
    title: 'Lord of the Rings: The Fellowship of the Ring, The',
    genres: ['Gothic', 'Cookbook'],
    publicationDate: '1/27/1982',
    publisher: 'Jaxbean',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '680162376-1',
    language: 'Persian',
    pageCount: 938,
    price: 67.74,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'c9b33d31-b1a0-425a-b2bc-fd9b08014a9f'
  },
  {
    _id: 'e9a6c28a-3305-4e44-a02b-a82443760eb5',
    title: 'My House in Umbria',
    genres: [
      'Contemporary',
      'Travel',
      'Science Fiction',
      'Motivational',
      'Guide / How-to'
    ],
    publicationDate: '10/18/1945',
    publisher: 'Katz',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '069548260-2',
    language: 'Yiddish',
    pageCount: 329,
    price: 85.31,
    format: ['Paperback', 'Hardcover'],
    authorId: 'e7b3869d-bcc4-4a5d-b58d-76e895fece8f'
  },
  {
    _id: 'b2d66e43-e84b-4430-b18c-8e1a71dcaa0d',
    title: 'Grand Tour: Disaster in Time (Timescape)',
    genres: ['Historical fiction', 'Science Fiction'],
    publicationDate: '4/6/1992',
    publisher: 'Dynabox',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '188833172-0',
    language: 'Danish',
    pageCount: 905,
    price: 12.43,
    format: ['Paperback'],
    authorId: '6a072217-4ef7-4c73-9117-7a51f0cae605'
  },
  {
    _id: '0a740411-11f1-4422-9cd2-7e4f39941c2d',
    title: 'Undisputed III: Redemption',
    genres: ['Families & Relationships', 'Adventure'],
    publicationDate: '7/3/1939',
    publisher: 'Realcube',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '784222158-8',
    language: 'Malay',
    pageCount: 70,
    price: 21.45,
    format: ['Hardcover'],
    authorId: '140bb64f-c2ca-4250-97a7-7d5c395d1ea2'
  },
  {
    _id: '1393af89-7b25-45fb-88a0-cd10e6f51946',
    title: 'Bank, The',
    genres: ['Families & Relationships'],
    publicationDate: '11/13/1969',
    publisher: 'Twitterlist',
    summary: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '197290168-0',
    language: 'Fijian',
    pageCount: 833,
    price: 75.57,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '05aed9ce-ffa9-42fc-a9b2-cd1b52551bf1'
  },
  {
    _id: 'f607861e-008d-4e01-ba2e-e31eaafb0cd8',
    title: 'Undisputed III: Redemption',
    genres: ['Art', 'Adventure'],
    publicationDate: '9/7/1986',
    publisher: 'Blogtags',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '883476734-9',
    language: 'Hiri Motu',
    pageCount: 783,
    price: 30.63,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '66ca252a-e957-4050-93df-aa40f49f244e'
  },
  {
    _id: 'f567162d-9a06-4613-9ea4-864a894e8906',
    title: 'Tin Cup',
    genres: [
      'Bildungsroman',
      'Mystery',
      'Historical fiction',
      'Families & Relationships',
      'Cookbook'
    ],
    publicationDate: '3/19/1996',
    publisher: 'Dabshots',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '177361646-3',
    language: 'Malagasy',
    pageCount: 823,
    price: 32.84,
    format: ['Hardcover', 'E-Book'],
    authorId: '52c6e175-5bf4-4671-ac86-665e4dc54901'
  },
  {
    _id: '8d08d534-bf38-4fe1-8372-29c35d856d73',
    title: 'The Missionaries',
    genres: [
      'Historical fiction',
      'Personal Development',
      'Motivational',
      'Romance'
    ],
    publicationDate: '4/30/1911',
    publisher: 'Skiptube',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '861313034-8',
    language: 'Thai',
    pageCount: 945,
    price: 3.68,
    format: ['Hardcover', 'Paperback'],
    authorId: '0a271c3c-9919-4c8a-8261-c9f7336695bd'
  },
  {
    _id: 'e6e7a824-5875-42a9-916d-0156411ae69b',
    title: 'Regeneration',
    genres: [
      'Gothic',
      'Humor',
      'Southern Gothic Fiction',
      'Health',
      'Science Fiction'
    ],
    publicationDate: '11/11/1933',
    publisher: 'Vipe',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '240203351-7',
    language: 'Lao',
    pageCount: 200,
    price: 91.56,
    format: ['E-Book', 'Hardcover'],
    authorId: 'f44f7f78-2326-465b-8abe-9724da08ac22'
  },
  {
    _id: 'a7195f90-9d95-48c6-844f-e56d5217b943',
    title: 'Dead Outside, The',
    genres: ['Southern Gothic Fiction', 'Health', 'Paranormal'],
    publicationDate: '5/29/1901',
    publisher: 'Linkbuzz',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '901859312-5',
    language: 'Swahili',
    pageCount: 56,
    price: 67.71,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '90bfbe58-8cd0-4052-9c32-45c611c51e91'
  },
  {
    _id: 'a4d6a476-4d62-4902-b578-be9215f2064c',
    title: 'Scattered Clouds (Midaregumo)',
    genres: ['Mystery', 'Paranormal'],
    publicationDate: '3/26/1900',
    publisher: 'Voonyx',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '362085202-2',
    language: 'Bosnian',
    pageCount: 801,
    price: 87.94,
    format: ['Paperback', 'Hardcover'],
    authorId: '9e62336d-16ab-4b93-8f11-158b94049da3'
  },
  {
    _id: '7954adf8-1c72-41b4-a42c-49f35f459113',
    title: 'Magadheera',
    genres: ['Dystopian', 'Children’s', 'Historical fiction'],
    publicationDate: '1/1/1945',
    publisher: 'Demivee',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '934344963-1',
    language: 'Tetum',
    pageCount: 667,
    price: 84.76,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '11d8a604-6039-4287-ad62-4a1359cb9929'
  },
  {
    _id: '58c6e542-57cd-4ffa-ab94-89751a9714df',
    title: 'Back in Business',
    genres: [
      'Historical fiction',
      'Dystopian',
      'Personal Development',
      'Travel'
    ],
    publicationDate: '10/1/2019',
    publisher: 'Trilith',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '003544674-9',
    language: 'Tetum',
    pageCount: 162,
    price: 8.65,
    format: ['E-Book'],
    authorId: 'b015046f-5b36-4f1a-bec9-e25b8c0a74f6'
  },
  {
    _id: 'b973a821-749a-4a4a-92fc-237372132f94',
    title: 'Children of the Corn V: Fields of Terror',
    genres: ['Science Fiction', 'Travel'],
    publicationDate: '12/13/1918',
    publisher: 'Skinder',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '663171216-5',
    language: 'Papiamento',
    pageCount: 230,
    price: 95.64,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'fe943a18-1ea9-49ed-a5cd-30967dd95bd2'
  },
  {
    _id: 'c150a0f6-7b82-4229-912c-b9d81d5a184a',
    title: 'Inferno',
    genres: ['Adventure', 'Art'],
    publicationDate: '3/27/2012',
    publisher: 'Talane',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '757557513-8',
    language: 'Bulgarian',
    pageCount: 275,
    price: 72.37,
    format: ['Paperback', 'Hardcover'],
    authorId: 'de267c83-3c12-44a1-b786-a8afea541bbd'
  },
  {
    _id: 'ea762e44-9d4c-40cf-87a6-0935e1027246',
    title: 'Redhead from Wyoming, The',
    genres: ['Guide / How-to', 'Gothic'],
    publicationDate: '9/25/1947',
    publisher: 'Zava',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '877075954-5',
    language: 'Catalan',
    pageCount: 520,
    price: 27.73,
    format: ['E-Book', 'Paperback'],
    authorId: '9ecc533b-d3bd-4812-8f64-12c7cc1404b1'
  },
  {
    _id: '03a7fc09-5b38-49af-b3c1-7c521ada8e36',
    title: 'Volcano (Eldfjall)',
    genres: ['Humor', 'Paranormal', 'Thriller', 'Romance'],
    publicationDate: '11/29/1970',
    publisher: 'Jabbersphere',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '893345589-2',
    language: 'Gujarati',
    pageCount: 151,
    price: 56.7,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'b6193392-ae4c-422c-9670-b3a05a7280e2'
  },
  {
    _id: 'c931d3ef-a36c-4850-8cff-52d31a746369',
    title: 'Switch',
    genres: ['Bildungsroman', 'Children’s'],
    publicationDate: '2/8/1991',
    publisher: 'Skidoo',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '846511353-X',
    language: 'Latvian',
    pageCount: 565,
    price: 54.69,
    format: ['Hardcover'],
    authorId: '34388794-db0d-4545-b944-874bb3ef81c7'
  },
  {
    _id: '845b508f-3482-4b6f-ad75-56c55cdcea40',
    title: 'Viagem a Portugal',
    genres: ['Paranormal', 'Fiction'],
    publicationDate: '11/6/2022',
    publisher: 'Twitterworks',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '456457163-X',
    language: 'Bislama',
    pageCount: 729,
    price: 23.46,
    format: ['E-Book', 'Hardcover'],
    authorId: 'c041d756-40a0-4146-a219-bda3216a7615'
  },
  {
    _id: '843e6283-08cd-4732-9c26-18c414694483',
    title: '10 000 timmar',
    genres: ['Fiction', 'Thriller', 'Memoir', 'Bildungsroman', 'Paranormal'],
    publicationDate: '1/14/1992',
    publisher: 'Chatterbridge',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '541644892-X',
    language: 'Tajik',
    pageCount: 1,
    price: 30.26,
    format: ['E-Book', 'Paperback'],
    authorId: 'a9dbdd11-e458-4039-879d-3dd2ad3b79a3'
  },
  {
    _id: '45f1b0ef-5a18-4344-8c6c-1eeeafcf972e',
    title: 'Package, The',
    genres: ['Historical fiction', 'Self-help', 'Adventure'],
    publicationDate: '11/11/1945',
    publisher: 'Zazio',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '950309776-2',
    language: 'Aymara',
    pageCount: 232,
    price: 52.87,
    format: ['E-Book'],
    authorId: 'f36cd039-12da-4747-9bb8-ec8666fe62f3'
  },
  {
    _id: '82fc5b77-991b-4b4c-a7d5-665ba03a2269',
    title: 'Open House ',
    genres: ['Horror', 'Guide / How-to', 'Paranormal', 'Thriller', 'Romance'],
    publicationDate: '9/10/1956',
    publisher: 'Flashset',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '673372406-5',
    language: 'Spanish',
    pageCount: 439,
    price: 11.57,
    format: ['Paperback'],
    authorId: '3e877cfc-89d2-426f-9f9c-b369a04eb4c7'
  },
  {
    _id: 'e0e77ce4-1c07-40ae-83a3-9fcf83cc4490',
    title: 'Partly Cloudy',
    genres: ['Humor', 'History', 'Dystopian', 'Gothic'],
    publicationDate: '4/23/1984',
    publisher: 'Flashpoint',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '224196222-8',
    language: 'Romanian',
    pageCount: 545,
    price: 10.08,
    format: ['E-Book', 'Hardcover'],
    authorId: 'b2a68b98-ebf6-4259-ba4f-a95df6fcd8c2'
  },
  {
    _id: '31a73d8f-11b8-43f8-8b67-7eaa38669cb8',
    title: 'Man Who Never Was, The',
    genres: ['Mystery', 'Thriller', 'Dystopian', 'Personal Development'],
    publicationDate: '7/14/1952',
    publisher: 'Plambee',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '492183153-X',
    language: 'Maltese',
    pageCount: 882,
    price: 0.28,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'a08c97cf-b040-4cd6-8eed-c9e1af4cfb35'
  },
  {
    _id: '99bea1c7-82fe-4c4a-87a9-ca16cf76f620',
    title: 'What a Way to Go!',
    genres: ['History', 'Humor'],
    publicationDate: '8/14/1999',
    publisher: 'Thoughtstorm',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '703780433-9',
    language: 'Icelandic',
    pageCount: 120,
    price: 50.83,
    format: ['E-Book'],
    authorId: 'e3cd6df6-103e-4108-bc96-e0d39bd0713f'
  },
  {
    _id: '9224661b-6e9e-47d1-9cf0-fac80047491b',
    title: 'Night in Casablanca, A',
    genres: ['Travel', 'Science Fiction', 'Dystopian'],
    publicationDate: '8/10/2011',
    publisher: 'Tagopia',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '689917822-2',
    language: 'Bosnian',
    pageCount: 286,
    price: 48.67,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '9945ad76-02cd-419b-82cd-58fee9ef65f0'
  },
  {
    _id: '78bcbb3c-55a2-4e52-b948-eb4c547eb680',
    title: 'Rocaterrania',
    genres: ['Humor', 'Paranormal', 'Art', 'Travel', 'Horror'],
    publicationDate: '9/21/1988',
    publisher: 'Jazzy',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '298835913-X',
    language: 'Lao',
    pageCount: 669,
    price: 36.32,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '38216718-75b7-43ed-9e29-82c7935d3a53'
  },
  {
    _id: '9ff2a3fe-48b3-45c3-8577-0f22981efae3',
    title: 'Stranger Among Us, A',
    genres: ['Bildungsroman', 'Contemporary', 'Self-help', 'Fiction', 'Health'],
    publicationDate: '12/30/1999',
    publisher: 'Wordpedia',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '423748542-0',
    language: 'Hiri Motu',
    pageCount: 332,
    price: 45.31,
    format: ['E-Book', 'Hardcover'],
    authorId: '55ee063d-df44-4f92-bed4-e7f833f0c1b8'
  },
  {
    _id: 'bbf1115b-9b87-4acc-8f42-42865e3393ca',
    title: 'June 9 ',
    genres: ['Self-help', 'Motivational'],
    publicationDate: '12/11/1924',
    publisher: 'Eabox',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '625477209-4',
    language: 'Luxembourgish',
    pageCount: 123,
    price: 12.68,
    format: ['E-Book', 'Paperback'],
    authorId: '19fcdd32-aa73-4585-ade7-9cbf34ee4958'
  },
  {
    _id: '8dc12177-08a7-4265-a2c8-be990d90c970',
    title: "Li'l Quinquin",
    genres: ['Thriller', 'Contemporary', 'Southern Gothic Fiction'],
    publicationDate: '4/19/1953',
    publisher: 'Flipstorm',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '302330942-6',
    language: 'Quechua',
    pageCount: 631,
    price: 53.76,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: 'c36e56bd-b2fe-4b8e-b5da-45c1e7ce62f2',
    title: "Brian's Song",
    genres: ['Personal Development', 'Children’s', 'Thriller', 'Travel'],
    publicationDate: '7/21/1928',
    publisher: 'Babbleopia',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '186056462-3',
    language: 'French',
    pageCount: 254,
    price: 5.83,
    format: ['Paperback'],
    authorId: '8ac91c1f-2953-4700-a5b3-65ca01c03bf8'
  },
  {
    _id: 'aaeb0cd2-9aa8-46a5-b47f-d2915845c1f5',
    title: 'Company of Wolves, The',
    genres: ['Fiction', 'Bildungsroman', 'Health', 'Art', 'History'],
    publicationDate: '1/2/1963',
    publisher: 'Youspan',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '492394779-9',
    language: 'Thai',
    pageCount: 326,
    price: 97.25,
    format: ['Paperback', 'Hardcover'],
    authorId: 'd900d786-8c6b-4397-baf9-2a63650e5b75'
  },
  {
    _id: '191a1a0c-dca6-4c07-be53-f61a9c4b907d',
    title: 'Wanderers',
    genres: [
      'Contemporary',
      'Memoir',
      'Bildungsroman',
      'Personal Development',
      'Travel'
    ],
    publicationDate: '2/7/1971',
    publisher: 'Fivebridge',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '914518830-0',
    language: 'Nepali',
    pageCount: 76,
    price: 43.64,
    format: ['Hardcover', 'E-Book'],
    authorId: '545f84c0-63d1-419c-a21a-a46d8a189c79'
  },
  {
    _id: 'f45c37d4-9887-4477-95e9-9d3a1aee8959',
    title: 'Horror of Dracula (Dracula)',
    genres: [
      'History',
      'Southern Gothic Fiction',
      'Paranormal',
      'Fiction',
      'Children’s'
    ],
    publicationDate: '11/29/1981',
    publisher: 'Brainlounge',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '006785946-1',
    language: 'Albanian',
    pageCount: 767,
    price: 25.35,
    format: ['Paperback', 'E-Book'],
    authorId: '669c00a3-ff8b-4fb6-a913-f6bd5739a5b1'
  },
  {
    _id: '2636b740-bb27-4ce0-93cb-ffbc979fcdeb',
    title: 'Last Shot, The',
    genres: [
      'Families & Relationships',
      'Self-help',
      'Children’s',
      'Horror',
      'Travel'
    ],
    publicationDate: '4/7/1987',
    publisher: 'Skyble',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '941070056-6',
    language: 'Tok Pisin',
    pageCount: 780,
    price: 80.84,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '882dae67-dbf4-442a-9efd-2175c140f0f0'
  },
  {
    _id: '783f4e9d-cc9d-4bc1-884d-b217810d8c3f',
    title: 'That Forsyte Woman',
    genres: ['Science Fiction'],
    publicationDate: '6/2/1979',
    publisher: 'Realfire',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '302119507-5',
    language: 'English',
    pageCount: 567,
    price: 89.51,
    format: ['E-Book', 'Hardcover'],
    authorId: '3f8bf018-4b09-4f9d-8206-e079ad314a46'
  },
  {
    _id: '13ab4e92-f2fd-43de-9d1f-a332b04cb498',
    title: 'Like Father, Like Son (Soshite chichi ni naru)',
    genres: ['Motivational', 'Guide / How-to', 'Contemporary'],
    publicationDate: '1/13/2019',
    publisher: 'Edgeblab',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '974681222-X',
    language: 'Indonesian',
    pageCount: 732,
    price: 44.78,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'fd3164ab-cc21-4d6c-89aa-96148c5df31a'
  },
  {
    _id: '177476b9-def2-4ded-b5cd-3df64e7d99f9',
    title: 'Friday After Next',
    genres: ['Horror', 'Health', 'Adventure', 'Guide / How-to', 'Humor'],
    publicationDate: '5/19/1966',
    publisher: 'Rhyloo',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '833521770-X',
    language: 'Catalan',
    pageCount: 113,
    price: 72.84,
    format: ['Hardcover'],
    authorId: '935e284a-3232-49e2-a619-a4ebcff82601'
  },
  {
    _id: '5bdbc643-bfe4-4e1c-998b-58e2aac3c134',
    title: "Hotel Chevalier (Part 1 of 'The Darjeeling Limited')",
    genres: ['Thriller', 'History'],
    publicationDate: '6/18/1967',
    publisher: 'Rhycero',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '753413990-2',
    language: 'Irish Gaelic',
    pageCount: 393,
    price: 90.2,
    format: ['Paperback'],
    authorId: '616c089e-f551-4abe-82e0-0b0e1162c10b'
  },
  {
    _id: 'ea7d723a-3876-41e4-baee-249570f22179',
    title: 'Next Door (Naboer)',
    genres: [
      'Fiction',
      'Guide / How-to',
      'Contemporary',
      'Paranormal',
      'Horror'
    ],
    publicationDate: '5/4/1970',
    publisher: 'Rhycero',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '141991854-0',
    language: 'Swati',
    pageCount: 541,
    price: 47.95,
    format: ['Hardcover', 'Paperback'],
    authorId: '55ee063d-df44-4f92-bed4-e7f833f0c1b8'
  },
  {
    _id: 'f3d07d72-10aa-4bb1-b822-48beba6da387',
    title: 'Frankenstein',
    genres: ['Fiction', 'History', 'Motivational', 'Bildungsroman'],
    publicationDate: '10/31/1923',
    publisher: 'Janyx',
    summary: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '223237838-1',
    language: 'Polish',
    pageCount: 726,
    price: 60.39,
    format: ['Paperback', 'Hardcover'],
    authorId: '669c00a3-ff8b-4fb6-a913-f6bd5739a5b1'
  },
  {
    _id: 'b9054859-f1f8-49aa-aa5b-18005427ab86',
    title: 'Musicwood',
    genres: ['Self-help'],
    publicationDate: '3/29/1955',
    publisher: 'Yodo',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '578173080-X',
    language: 'Ndebele',
    pageCount: 542,
    price: 28.07,
    format: ['E-Book'],
    authorId: '05aed9ce-ffa9-42fc-a9b2-cd1b52551bf1'
  },
  {
    _id: '15e995ee-f98a-49f2-88a6-f5333e128ea4',
    title: 'The Party',
    genres: ['Cookbook'],
    publicationDate: '9/21/1949',
    publisher: 'Yadel',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '622144129-3',
    language: 'Kurdish',
    pageCount: 467,
    price: 17.88,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '8f05cd37-2622-4c6a-a5a7-d9d3b48cb3fe'
  },
  {
    _id: '7057b40d-ff62-4cc7-b559-a17850af2fcb',
    title: 'Chill',
    genres: ['Families & Relationships', 'Health', 'Travel'],
    publicationDate: '10/24/1904',
    publisher: 'Babbleopia',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '275604643-4',
    language: 'Tamil',
    pageCount: 431,
    price: 93.72,
    format: ['Hardcover'],
    authorId: 'f7ca40f3-7532-4e30-8294-033621c53d6e'
  },
  {
    _id: 'fb947bad-b10b-420a-b70b-cc47742fd0a4',
    title: 'Jade Warrior (Jadesoturi)',
    genres: [
      'History',
      'Personal Development',
      'Memoir',
      'Travel',
      'Guide / How-to'
    ],
    publicationDate: '3/18/1917',
    publisher: 'Abatz',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    isbn: '856539243-0',
    language: 'Lithuanian',
    pageCount: 543,
    price: 72.76,
    format: ['Paperback'],
    authorId: '309142ce-c7b0-4215-8bee-443f8ef8bbfc'
  },
  {
    _id: '5e7458c0-8a6d-485a-babf-e40d3c9b938b',
    title: 'Sahara',
    genres: ['Motivational', 'Gothic', 'Memoir'],
    publicationDate: '6/8/2004',
    publisher: 'Buzzbean',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '110782936-4',
    language: 'Māori',
    pageCount: 534,
    price: 70.85,
    format: ['Paperback', 'Hardcover'],
    authorId: '88bd4d52-9bfd-4419-b8f7-aa33ca8678ed'
  },
  {
    _id: '411eff1e-2ddf-44a1-b246-3447c1fa8cca',
    title: 'Glory Road',
    genres: ['Children’s', 'Personal Development'],
    publicationDate: '7/19/1925',
    publisher: 'Chatterbridge',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '676627956-7',
    language: 'Greek',
    pageCount: 833,
    price: 75.73,
    format: ['Hardcover'],
    authorId: '0547b9ff-4a01-465d-ba37-3be4cd542aea'
  },
  {
    _id: '84985e47-64c4-4af9-99dc-ffaf65672169',
    title: 'Double Tide',
    genres: ['Contemporary', 'Children’s', 'Fiction', 'Art', 'Guide / How-to'],
    publicationDate: '10/19/1935',
    publisher: 'Oozz',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '920968923-2',
    language: 'Swahili',
    pageCount: 222,
    price: 54.91,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'ff58ae27-6e52-4231-8ae5-daa957eebac3'
  },
  {
    _id: '53ce5bbc-80ee-4b80-8503-7bea9ca32d9b',
    title: 'Supergirl',
    genres: ['Bildungsroman', 'Cookbook'],
    publicationDate: '4/28/1938',
    publisher: 'Livepath',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '496419819-7',
    language: 'Quechua',
    pageCount: 282,
    price: 18.24,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '1f65d08a-d59a-49fd-a511-31fef75f8280'
  },
  {
    _id: '41f9bfb8-8252-470e-be0b-99ee39a41382',
    title: 'Behind the Sun (Abril Despedaçado)',
    genres: ['Gothic', 'Contemporary'],
    publicationDate: '5/17/1979',
    publisher: 'Trudoo',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '510775241-1',
    language: 'Tetum',
    pageCount: 526,
    price: 77.24,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '9e447a26-aaaa-41e6-bb04-241b552dcbbc'
  },
  {
    _id: 'ade4f1cf-aa58-4641-b97d-df161b781b19',
    title: 'Gray Lady Down',
    genres: ['Fiction', 'Travel', 'Mystery', 'Contemporary'],
    publicationDate: '12/22/1923',
    publisher: 'Voonix',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '983752234-8',
    language: 'Swahili',
    pageCount: 383,
    price: 13.38,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '58af24c2-21ea-4b9e-903b-54facd8d9b17'
  },
  {
    _id: 'd2cde7c3-0dac-4b60-8793-709695e38325',
    title: 'Saw V',
    genres: ['Personal Development', 'Self-help', 'Humor', 'Health'],
    publicationDate: '4/1/1991',
    publisher: 'Tagfeed',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '636929522-1',
    language: 'Afrikaans',
    pageCount: 816,
    price: 88.1,
    format: ['Paperback'],
    authorId: '6c9ab84b-60f8-4bce-9675-07767d6573a0'
  },
  {
    _id: '658f2f74-43b0-47eb-b230-9b022cafd322',
    title: 'Professional, The (Le professionnel)',
    genres: ['Contemporary'],
    publicationDate: '12/21/1924',
    publisher: 'Abatz',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '801591265-2',
    language: 'Chinese',
    pageCount: 593,
    price: 99.32,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '99721619-92e0-44ce-b189-6e09d5d15616'
  },
  {
    _id: '912f7432-8d1b-4f68-82fb-271b8a5b3247',
    title: 'Himizu',
    genres: ['Guide / How-to', 'Motivational', 'Adventure'],
    publicationDate: '6/11/1963',
    publisher: 'Jaxbean',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '659754869-8',
    language: 'Czech',
    pageCount: 768,
    price: 22.33,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '2ddfc0e1-93ef-4ec2-ae77-7d5525305473'
  },
  {
    _id: 'cbf68500-e102-47b4-9728-045656e47def',
    title: 'Mother Night',
    genres: [
      'Families & Relationships',
      'Guide / How-to',
      'Self-help',
      'Fiction'
    ],
    publicationDate: '5/1/1971',
    publisher: 'Wikizz',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    isbn: '808877403-9',
    language: 'New Zealand Sign Language',
    pageCount: 581,
    price: 3.7,
    format: ['E-Book', 'Paperback'],
    authorId: '9ab6487c-31f9-4b8f-8010-b6104fff041b'
  },
  {
    _id: '948347d5-8a4e-4335-b5d0-9914597b6d97',
    title: 'Bridegroom',
    genres: ['Families & Relationships', 'Children’s'],
    publicationDate: '4/25/2010',
    publisher: 'Fiveclub',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '888952293-3',
    language: 'Dari',
    pageCount: 264,
    price: 36.2,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'de267c83-3c12-44a1-b786-a8afea541bbd'
  },
  {
    _id: '1e0fc9b7-646c-47c3-a189-be6da86ad171',
    title: 'Amazing Johnathan: Wrong on Every Level',
    genres: ['Humor', 'Fiction', 'Contemporary'],
    publicationDate: '2/21/1903',
    publisher: 'Photospace',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '493476654-5',
    language: 'Albanian',
    pageCount: 55,
    price: 68.64,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '0771dc5a-d9bc-4fe1-a488-b5c68a136c39'
  },
  {
    _id: '8a720958-2ccd-4239-b5e8-59082bbff23f',
    title: 'Friends with Benefits',
    genres: [
      'Travel',
      'Self-help',
      'Personal Development',
      'Children’s',
      'Paranormal'
    ],
    publicationDate: '4/20/2012',
    publisher: 'Leexo',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '036307994-7',
    language: 'Kashmiri',
    pageCount: 315,
    price: 24.3,
    format: ['Hardcover'],
    authorId: '453f98ca-5bee-4400-ab0e-96796717496c'
  },
  {
    _id: 'a7e3efa1-444a-410b-8c31-990b711e4761',
    title: 'Emperor Jones, The',
    genres: ['Bildungsroman', 'Southern Gothic Fiction', 'Health'],
    publicationDate: '12/4/2012',
    publisher: 'Rooxo',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '207753635-7',
    language: 'Chinese',
    pageCount: 281,
    price: 3.6,
    format: ['Hardcover'],
    authorId: '3b8b056c-ee3d-4e73-9db6-e01e771d6718'
  },
  {
    _id: '0ff64f74-f01d-4c62-a071-9ea36508f5c6',
    title: 'How to Survive a Plague',
    genres: ['Mystery', 'Historical fiction'],
    publicationDate: '11/28/1985',
    publisher: 'Quinu',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '842683772-7',
    language: 'Ndebele',
    pageCount: 859,
    price: 81.44,
    format: ['Hardcover', 'E-Book'],
    authorId: 'ab02e951-4cf9-4b1c-89fd-752079f39ef3'
  },
  {
    _id: '7b04d3b8-e07b-400a-9e3f-21c4f031a30d',
    title: 'Sixtynine',
    genres: ['Health', 'Humor', 'Paranormal', 'Mystery', 'Guide / How-to'],
    publicationDate: '5/30/2014',
    publisher: 'Edgepulse',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '654449043-1',
    language: 'Icelandic',
    pageCount: 292,
    price: 98.03,
    format: ['Hardcover', 'E-Book'],
    authorId: '519bb91e-e170-46e3-96f6-a363ea30ff1d'
  },
  {
    _id: 'e2254f43-0b12-4f9d-b8a9-3c3ec12c3415',
    title: 'Equalizer, The',
    genres: [
      'Mystery',
      'Cookbook',
      'Dystopian',
      'Southern Gothic Fiction',
      'Memoir'
    ],
    publicationDate: '5/28/1900',
    publisher: 'Mita',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '300985215-0',
    language: 'Dari',
    pageCount: 403,
    price: 46.39,
    format: ['Paperback'],
    authorId: '7e5ac46a-3b7e-480f-a394-26aa9b8fc722'
  },
  {
    _id: 'd452d1df-311f-4e30-9f60-9f07bb9014fa',
    title: 'Calamity Jane',
    genres: ['Travel', 'Adventure', 'Self-help', 'Guide / How-to'],
    publicationDate: '5/28/1952',
    publisher: 'DabZ',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '934734551-2',
    language: 'Dutch',
    pageCount: 204,
    price: 65.69,
    format: ['Hardcover'],
    authorId: 'd9ea6a95-9ea8-4d70-89cc-8abc389aaa80'
  },
  {
    _id: 'dd533f11-c0a8-45a6-8452-4e93a488a661',
    title: 'Atlantis, the Lost Continent',
    genres: [
      'Humor',
      'Personal Development',
      'Thriller',
      'Health',
      'Contemporary'
    ],
    publicationDate: '6/8/1915',
    publisher: 'Edgeify',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '798232187-9',
    language: 'Armenian',
    pageCount: 609,
    price: 96.11,
    format: ['Paperback', 'E-Book'],
    authorId: '2849bbd5-81c3-48a1-bb3b-91c2dfcf4e46'
  },
  {
    _id: 'd14228c6-ce24-4edd-887e-d661dd0832b3',
    title: 'Wisdom of Crocodiles, The (a.k.a. Immortality)',
    genres: [
      'Mystery',
      'Health',
      'Self-help',
      'Motivational',
      'Historical fiction'
    ],
    publicationDate: '11/18/1975',
    publisher: 'Brainverse',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '145998889-2',
    language: 'Somali',
    pageCount: 214,
    price: 27.8,
    format: ['Paperback'],
    authorId: '4ac1276b-9471-4c52-a138-182746b8b89d'
  },
  {
    _id: '0285d55d-3905-4de0-b7c4-1e70144f92a0',
    title: 'Harem suare',
    genres: ['Adventure', 'Children’s'],
    publicationDate: '4/10/1927',
    publisher: 'Tazz',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '663501475-6',
    language: 'Korean',
    pageCount: 2,
    price: 31.66,
    format: ['Paperback'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: '4fd53343-14ee-4cc6-97eb-27e1c630930f',
    title: 'Murderous Maids (Blessures assassines, Les)',
    genres: [
      'Families & Relationships',
      'Fiction',
      'Cookbook',
      'Guide / How-to'
    ],
    publicationDate: '12/16/1942',
    publisher: 'Photospace',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '599935744-6',
    language: 'Afrikaans',
    pageCount: 627,
    price: 54.6,
    format: ['Paperback'],
    authorId: 'b9e0dee8-7e4b-49f3-a522-8d41ee20adc7'
  },
  {
    _id: '06a7e79e-f88a-4e67-8c22-e6f13064fb37',
    title: 'Center of the World, The',
    genres: ['Southern Gothic Fiction', 'Thriller', 'Travel', 'History'],
    publicationDate: '11/6/1906',
    publisher: 'Dynazzy',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '361654301-0',
    language: 'Czech',
    pageCount: 15,
    price: 75.79,
    format: ['Paperback'],
    authorId: '55ee063d-df44-4f92-bed4-e7f833f0c1b8'
  },
  {
    _id: '37c5c1e9-bf48-4475-a6b5-b3f337849243',
    title: 'Miss Farkku-Suomi',
    genres: ['Families & Relationships', 'Motivational', 'Cookbook'],
    publicationDate: '9/6/1951',
    publisher: 'Jaxbean',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '487009460-6',
    language: 'Bislama',
    pageCount: 954,
    price: 21.31,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '757e021b-a7e0-40e4-9e4f-3b944433f545'
  },
  {
    _id: '8e304f98-c862-458d-aacf-c8ea1bf15592',
    title: 'Sugar Cane Alley (Rue cases nègres)',
    genres: ['Families & Relationships'],
    publicationDate: '7/20/1956',
    publisher: 'Flashset',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '910148383-8',
    language: 'Montenegrin',
    pageCount: 588,
    price: 65.24,
    format: ['Hardcover'],
    authorId: '0c6bb74d-5ba1-401f-a80a-373d09e8db8d'
  },
  {
    _id: 'b0b70bff-2a5a-49a4-a0ec-400fb6ca8e72',
    title: 'Grand Budapest Hotel, The',
    genres: ['Guide / How-to'],
    publicationDate: '12/6/1948',
    publisher: 'Brainlounge',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '997660122-0',
    language: 'Catalan',
    pageCount: 1000,
    price: 18.18,
    format: ['E-Book', 'Hardcover'],
    authorId: '79c78869-f315-46e3-a736-f12824759680'
  },
  {
    _id: '4650c99a-83d8-4391-88a2-4792ec0a0d88',
    title: 'Otis',
    genres: ['Paranormal', 'Memoir', 'Personal Development'],
    publicationDate: '1/17/1996',
    publisher: 'Fivechat',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '463619257-5',
    language: 'Māori',
    pageCount: 154,
    price: 24.81,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '802d98db-0a9c-4539-8ad4-a6bc19385fb9'
  },
  {
    _id: 'd248cc25-a0b5-4e51-99fc-92ed653a4415',
    title: "Return to Salem's Lot, A",
    genres: ['Guide / How-to', 'Thriller'],
    publicationDate: '6/21/1988',
    publisher: 'Eadel',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '905176775-7',
    language: 'Swati',
    pageCount: 528,
    price: 99.75,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '52829d96-d5e7-4f7d-ba95-236b12449a16'
  },
  {
    _id: 'ea38d202-1878-4661-b1c7-f118ca409b0c',
    title: 'Pianist, The',
    genres: ['Children’s', 'Self-help', 'Humor'],
    publicationDate: '7/14/2011',
    publisher: 'Wikizz',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '885016932-9',
    language: 'Tetum',
    pageCount: 978,
    price: 3.92,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '11d8a604-6039-4287-ad62-4a1359cb9929'
  },
  {
    _id: 'a30932cb-1e85-4aae-9c41-bf387ad6cffe',
    title: 'Tuvalu',
    genres: [
      'Horror',
      'Fiction',
      'Science Fiction',
      'Families & Relationships',
      'Southern Gothic Fiction'
    ],
    publicationDate: '11/6/2009',
    publisher: 'Eabox',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '330134538-7',
    language: 'Tetum',
    pageCount: 311,
    price: 86.09,
    format: ['Hardcover', 'Paperback'],
    authorId: 'd591b088-c7e4-472d-a075-884586a51bf8'
  },
  {
    _id: '60f97774-a1f7-4020-bbc8-894aa1e401b9',
    title: 'Snow Queen, The (Lumikuningatar)',
    genres: [
      'Bildungsroman',
      'Travel',
      'Historical fiction',
      'Romance',
      'Contemporary'
    ],
    publicationDate: '3/28/1929',
    publisher: 'Zoomlounge',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '639004458-5',
    language: 'Filipino',
    pageCount: 295,
    price: 17.78,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'c6b583b0-8011-496d-a23b-8d6e62d43a38'
  },
  {
    _id: 'dd700b32-83d0-4474-8779-b3e82302612b',
    title: 'Polar Bear King, The (Kvitebjørn Kong Valemon)',
    genres: ['Humor'],
    publicationDate: '7/2/1913',
    publisher: 'Buzzbean',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '409990638-8',
    language: 'German',
    pageCount: 706,
    price: 42.54,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '92b9cab7-48d9-4183-8469-4669431fc132'
  },
  {
    _id: 'b33a3355-d5c0-4634-ba2a-2d129c133ab0',
    title: 'Mr. Untouchable',
    genres: ['Mystery'],
    publicationDate: '9/24/1942',
    publisher: 'Dynabox',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '615272458-9',
    language: 'Estonian',
    pageCount: 996,
    price: 87.74,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '724eec89-1af5-414a-b899-c286032fbba3'
  },
  {
    _id: '2d2f3fd0-708f-4734-8831-cb156e22f2f8',
    title: 'Witch Way Love (Un amour de sorcière)',
    genres: ['Travel', 'Families & Relationships', 'Art'],
    publicationDate: '3/25/2017',
    publisher: 'Meedoo',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '241584534-5',
    language: 'Tamil',
    pageCount: 372,
    price: 83.77,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'da78d931-1396-40a5-b042-5a20ad83c80e'
  },
  {
    _id: 'fed8023f-4900-4349-806b-8e0e3f46fefe',
    title: 'Westward Ho',
    genres: ['Personal Development', 'Travel', 'Art'],
    publicationDate: '6/5/1902',
    publisher: 'Jabbersphere',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '443488508-1',
    language: 'Tok Pisin',
    pageCount: 526,
    price: 16.3,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'c9b33d31-b1a0-425a-b2bc-fd9b08014a9f'
  },
  {
    _id: '82ff082e-78c7-41ce-a7a4-f9afaa7c0e17',
    title: 'Welcome Home, Roscoe Jenkins',
    genres: ['Art'],
    publicationDate: '2/2/1972',
    publisher: 'Talane',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '071732566-0',
    language: 'Dzongkha',
    pageCount: 820,
    price: 34.29,
    format: ['Hardcover', 'Paperback'],
    authorId: 'b1fa1dd5-1ac3-4812-86e7-394b18e8bb7c'
  },
  {
    _id: '89d1b5dc-8acf-4079-92da-e2625d023ed1',
    title: 'Zandalee',
    genres: ['Art', 'Romance', 'Children’s', 'Horror', 'Mystery'],
    publicationDate: '1/2/2009',
    publisher: 'Dablist',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '540118656-8',
    language: 'Somali',
    pageCount: 279,
    price: 12.43,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '21781c41-f8c7-41c7-9892-d5e2fb698458'
  },
  {
    _id: '9d65394f-3882-41a7-a3a2-bf98bbb16a7d',
    title: 'Passenger 57',
    genres: ['Romance'],
    publicationDate: '4/10/2010',
    publisher: 'Skyba',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '332239567-7',
    language: 'English',
    pageCount: 456,
    price: 78,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '53ba42c6-2352-48fa-ba26-50d5b94d020c'
  },
  {
    _id: 'ed1f43af-06c1-4d5c-a855-769fc88094a6',
    title: 'My Tutor',
    genres: ['Thriller', 'Romance', 'Contemporary', 'Humor'],
    publicationDate: '1/30/1954',
    publisher: 'InnoZ',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '550021734-8',
    language: 'Armenian',
    pageCount: 22,
    price: 72.3,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '1dd95e98-1d70-420f-8839-12cfbbd33709'
  },
  {
    _id: '7a61cb4d-6295-435a-8ad9-33298d8cba10',
    title: 'Treasure Island',
    genres: ['Thriller'],
    publicationDate: '7/19/1961',
    publisher: 'Jatri',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '720143318-0',
    language: 'Papiamento',
    pageCount: 617,
    price: 0.91,
    format: ['Paperback', 'E-Book'],
    authorId: '95e88e8a-f672-45b8-aa8d-d2e7a4a20dc1'
  },
  {
    _id: 'd914f0bf-3cf3-45d1-b67a-fd08ceea0be1',
    title: 'Celtic Pride',
    genres: ['Travel'],
    publicationDate: '11/1/1987',
    publisher: 'Zooveo',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '171122272-0',
    language: 'English',
    pageCount: 17,
    price: 9.2,
    format: ['Paperback'],
    authorId: '48130f47-f29f-4389-b9cd-969c927533e6'
  },
  {
    _id: 'aa25cb4d-a1e2-46a8-a935-c5b12a950395',
    title: 'Johnny Mad Dog',
    genres: [
      'Motivational',
      'Health',
      'Memoir',
      'Bildungsroman',
      'Personal Development'
    ],
    publicationDate: '8/18/1981',
    publisher: 'Devbug',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '332986858-9',
    language: 'Kyrgyz',
    pageCount: 127,
    price: 71.45,
    format: ['Paperback', 'Hardcover'],
    authorId: '0396f370-f0b1-492b-8200-5003b76e66b2'
  },
  {
    _id: '42235695-d83a-459d-b027-6d0df53d6523',
    title: 'Scoop',
    genres: [
      'Personal Development',
      'Families & Relationships',
      'Adventure',
      'Self-help',
      'Guide / How-to'
    ],
    publicationDate: '12/19/1929',
    publisher: 'Rhybox',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '535852334-0',
    language: 'Bulgarian',
    pageCount: 813,
    price: 81.31,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '724eec89-1af5-414a-b899-c286032fbba3'
  },
  {
    _id: '22587d23-84cd-4954-87b7-cd5ba648034a',
    title: 'Hobbit, The',
    genres: ['Historical fiction', 'Gothic', 'Families & Relationships'],
    publicationDate: '12/20/1974',
    publisher: 'Ozu',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '907230309-1',
    language: 'Greek',
    pageCount: 146,
    price: 46.61,
    format: ['Hardcover'],
    authorId: '873497f1-d973-4516-9da1-18bc913c26a0'
  },
  {
    _id: '6d9e96fd-f7c9-48e9-9fe5-09555e6673e6',
    title: 'Sexual Life',
    genres: [
      'Children’s',
      'Motivational',
      'Mystery',
      'Historical fiction',
      'Travel'
    ],
    publicationDate: '7/12/1940',
    publisher: 'Yata',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '597792868-8',
    language: 'Tamil',
    pageCount: 436,
    price: 36.25,
    format: ['E-Book'],
    authorId: 'f36cd039-12da-4747-9bb8-ec8666fe62f3'
  },
  {
    _id: '8def5c59-c208-4ba4-af11-4627f6ed0db3',
    title: 'Happiness Is a Warm Blanket, Charlie Brown',
    genres: ['Dystopian', 'Contemporary', 'Horror', 'Cookbook', 'Paranormal'],
    publicationDate: '7/31/1949',
    publisher: 'Edgetag',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '587219258-4',
    language: 'Belarusian',
    pageCount: 54,
    price: 49.98,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '545f84c0-63d1-419c-a21a-a46d8a189c79'
  },
  {
    _id: '0d22ef11-4463-4a68-85d4-a6b338df70ec',
    title: 'Dolly and Her Lover (Räpsy ja Dolly eli Pariisi odottaa)',
    genres: ['Romance', 'Mystery', 'Science Fiction', 'Fiction', 'Self-help'],
    publicationDate: '7/29/1980',
    publisher: 'Mynte',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '156025454-8',
    language: 'Aymara',
    pageCount: 453,
    price: 34.88,
    format: ['Hardcover'],
    authorId: '02c0d1d7-45a5-4429-a0aa-374313af1cc5'
  },
  {
    _id: '55bf1069-2f4b-44bc-801e-a366aac702fb',
    title: 'Red Beret, The',
    genres: ['Historical fiction'],
    publicationDate: '1/26/1915',
    publisher: 'Ooba',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '308643625-5',
    language: 'Tetum',
    pageCount: 866,
    price: 23.54,
    format: ['Paperback', 'E-Book'],
    authorId: '78c4acd0-25fa-47d6-ae89-9d2edb31bbbc'
  },
  {
    _id: '1b7744f7-012a-493d-b3cf-975305a2d135',
    title: 'South, The (Sur, El)',
    genres: ['Self-help'],
    publicationDate: '12/17/1960',
    publisher: 'Fivespan',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '926549206-6',
    language: 'Marathi',
    pageCount: 380,
    price: 40.87,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'c6b583b0-8011-496d-a23b-8d6e62d43a38'
  },
  {
    _id: '084aa96b-cd3c-4513-b5fe-2ebd8332ed00',
    title: 'Benigni',
    genres: ['Historical fiction'],
    publicationDate: '7/20/1935',
    publisher: 'Skibox',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '749282659-1',
    language: 'Italian',
    pageCount: 637,
    price: 19.07,
    format: ['Paperback', 'Hardcover'],
    authorId: '967a589c-e1d8-443d-a2da-1ebb6b6607db'
  },
  {
    _id: '3da79e8f-fa11-4196-84b8-904a44fe4a99',
    title: 'Contraband',
    genres: ['Paranormal', 'Motivational'],
    publicationDate: '12/20/1916',
    publisher: 'Yoveo',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '150214032-2',
    language: 'Danish',
    pageCount: 754,
    price: 11.13,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'fd3164ab-cc21-4d6c-89aa-96148c5df31a'
  },
  {
    _id: '7c31d067-25c9-476c-8fba-1c337515f01d',
    title: 'Caine Mutiny Court-Martial, The',
    genres: ['Humor', 'Historical fiction', 'History', 'Motivational'],
    publicationDate: '2/17/1918',
    publisher: 'Lajo',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '665169705-6',
    language: 'Dutch',
    pageCount: 588,
    price: 10.16,
    format: ['E-Book'],
    authorId: '96d8604e-0e99-4bd1-bcc6-1a0800b317c2'
  },
  {
    _id: 'f92ac365-329e-4914-9288-fca6e0c70106',
    title: 'Knucklehead',
    genres: ['Paranormal'],
    publicationDate: '4/20/2003',
    publisher: 'Thoughtmix',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '483575988-5',
    language: 'Finnish',
    pageCount: 244,
    price: 29.9,
    format: ['E-Book'],
    authorId: 'b073ca58-2055-4889-9f0c-0b6d86fee312'
  },
  {
    _id: 'fb9e4e17-4e47-4a0a-8c1f-6be1427aa660',
    title: 'Striking Range',
    genres: [
      'Contemporary',
      'Historical fiction',
      'Southern Gothic Fiction',
      'Children’s'
    ],
    publicationDate: '12/31/2014',
    publisher: 'Meemm',
    summary: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '117511431-6',
    language: 'Norwegian',
    pageCount: 464,
    price: 3.92,
    format: ['Paperback'],
    authorId: '519bb91e-e170-46e3-96f6-a363ea30ff1d'
  },
  {
    _id: '7bfe3bd7-e865-4cf9-ae6e-b6caec44d31b',
    title: '8 Women',
    genres: ['Guide / How-to', 'Children’s', 'Art', 'Travel'],
    publicationDate: '8/28/2014',
    publisher: 'Gevee',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '418371776-0',
    language: 'Khmer',
    pageCount: 775,
    price: 19.46,
    format: ['Hardcover', 'E-Book'],
    authorId: 'ab02e951-4cf9-4b1c-89fd-752079f39ef3'
  },
  {
    _id: 'e61f6601-9ec3-4d85-b0eb-69951f145f68',
    title: 'Prime of Miss Jean Brodie, The',
    genres: ['History', 'Personal Development', 'Science Fiction'],
    publicationDate: '1/30/1948',
    publisher: 'Blogtag',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '104531389-0',
    language: 'German',
    pageCount: 1000,
    price: 33.82,
    format: ['Paperback', 'Hardcover'],
    authorId: '8292872d-dad4-490c-ba30-7459f647d2ba'
  },
  {
    _id: 'ef710312-3333-41f5-acc4-ea023139acd5',
    title: 'Bingo Long Traveling All-Stars & Motor Kings, The',
    genres: ['Contemporary', 'Fiction'],
    publicationDate: '2/14/1949',
    publisher: 'Flipopia',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '771106754-2',
    language: 'Tetum',
    pageCount: 386,
    price: 51.17,
    format: ['E-Book'],
    authorId: '616c089e-f551-4abe-82e0-0b0e1162c10b'
  },
  {
    _id: 'b7c3c21b-ed92-427f-80cc-3dbc02e854e5',
    title: 'The Plague of the Zombies',
    genres: ['Science Fiction', 'Cookbook', 'Health', 'Mystery', 'Dystopian'],
    publicationDate: '11/27/1976',
    publisher: 'Trilia',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '191785032-8',
    language: 'Chinese',
    pageCount: 215,
    price: 33.18,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'b5f4b1de-bf43-4106-840b-bd0dd7e5ff37'
  },
  {
    _id: '9bb1d7ea-3a41-4e86-a4d1-3b670aef0329',
    title: 'Captain Horatio Hornblower R.N.',
    genres: ['Horror', 'Dystopian', 'Humor', 'Art', 'Science Fiction'],
    publicationDate: '10/26/1959',
    publisher: 'Bluejam',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '401367002-X',
    language: 'Persian',
    pageCount: 713,
    price: 10.7,
    format: ['E-Book'],
    authorId: '0bbf8a21-3237-4951-9035-efd68a0b05bd'
  },
  {
    _id: '6051c3ce-8ce3-44d9-96e5-ed11b2d00d09',
    title: 'Boys from Brazil, The',
    genres: ['Self-help', 'Families & Relationships', 'Horror', 'Art'],
    publicationDate: '4/24/1922',
    publisher: 'Meeveo',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '031090613-X',
    language: 'Hiri Motu',
    pageCount: 758,
    price: 32.22,
    format: ['Paperback', 'Hardcover'],
    authorId: '60456bcb-a2b8-405f-8245-69e4b17a183e'
  },
  {
    _id: 'dfd5f527-f65b-409a-b4cd-63d921ca2f75',
    title: 'In the Park',
    genres: [
      'Historical fiction',
      'Health',
      'Motivational',
      'Fiction',
      'Gothic'
    ],
    publicationDate: '12/28/1935',
    publisher: 'Shuffletag',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '153358595-4',
    language: 'Chinese',
    pageCount: 859,
    price: 87,
    format: ['Hardcover'],
    authorId: 'cd66289a-dd71-4130-b2bc-19723cf0fa08'
  },
  {
    _id: '78b77d7f-6e9f-4ccc-a511-53794c859caa',
    title: "Himalaya (Himalaya - l'enfance d'un chef)",
    genres: ['Children’s', 'Paranormal'],
    publicationDate: '6/23/1993',
    publisher: 'Quinu',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '756729639-X',
    language: 'Dzongkha',
    pageCount: 749,
    price: 30.39,
    format: ['E-Book'],
    authorId: '21cb65d1-3f24-4efd-be42-5169707738b4'
  },
  {
    _id: 'e0dc6d95-fcdd-4044-8454-c3910a67b89b',
    title: 'Human Trafficking',
    genres: ['Children’s', 'Science Fiction', 'Gothic'],
    publicationDate: '4/10/2014',
    publisher: 'Twitterbridge',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '811787962-X',
    language: 'Dutch',
    pageCount: 936,
    price: 14.16,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '3609b2b8-eb96-4d43-a772-42d8110c2b5f'
  },
  {
    _id: '1a03028c-83db-4b0f-a8fe-1ed14bc09da5',
    title: 'Zeitgeist: Addendum',
    genres: ['Horror', 'Mystery', 'Dystopian', 'Health', 'Thriller'],
    publicationDate: '11/17/2010',
    publisher: 'Twinder',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '693401762-5',
    language: 'Finnish',
    pageCount: 338,
    price: 78.25,
    format: ['Paperback'],
    authorId: '888ab9d8-f91e-4640-a951-54100e50d454'
  },
  {
    _id: '34b190b7-cd45-4575-a97c-02c44dac14c6',
    title: 'Nelly & Monsieur Arnaud',
    genres: [
      'Horror',
      'Dystopian',
      'Adventure',
      'Guide / How-to',
      'Bildungsroman'
    ],
    publicationDate: '8/13/1936',
    publisher: 'Thoughtworks',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '802040801-0',
    language: 'Telugu',
    pageCount: 503,
    price: 57.83,
    format: ['Paperback', 'Hardcover'],
    authorId: 'd7b5a558-a8ce-4aed-95b4-f9a92f663fb7'
  },
  {
    _id: 'fd84a773-7d88-4c0d-b95c-0a6626d4682f',
    title: 'New Country, The (Det nya landet)',
    genres: ['Mystery', 'Gothic'],
    publicationDate: '10/20/1939',
    publisher: 'Omba',
    summary: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '844499440-5',
    language: 'Kyrgyz',
    pageCount: 462,
    price: 18.12,
    format: ['Hardcover'],
    authorId: 'd456d4d6-1ea4-4726-a758-538082d6a01d'
  },
  {
    _id: '9374c77b-7ead-4b80-b0ff-c6dbccebf2a4',
    title: 'Ethan Mao',
    genres: [
      'Personal Development',
      'Travel',
      'Dystopian',
      'Historical fiction'
    ],
    publicationDate: '8/11/1984',
    publisher: 'Flipopia',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '286108970-9',
    language: 'Swati',
    pageCount: 294,
    price: 11.5,
    format: ['Hardcover', 'Paperback'],
    authorId: '5a5c7c5f-8258-433c-aed7-2a498d355659'
  },
  {
    _id: '72bae0c3-a5b9-405e-b489-d4cfcad303f3',
    title: 'Dead Pit, The',
    genres: ['Guide / How-to', 'History'],
    publicationDate: '10/18/1922',
    publisher: 'Tavu',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '627935873-9',
    language: 'Croatian',
    pageCount: 445,
    price: 91.94,
    format: ['E-Book'],
    authorId: '3693b60f-d979-4370-89dc-54c243a7c8af'
  },
  {
    _id: '36ff37ae-3697-4940-8c86-d13241619bbb',
    title: 'The Infinite Man',
    genres: ['Historical fiction', 'Children’s'],
    publicationDate: '9/27/1901',
    publisher: 'Wikivu',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '143736578-7',
    language: 'Tamil',
    pageCount: 619,
    price: 95.26,
    format: ['E-Book', 'Hardcover'],
    authorId: '31406a1a-f2f6-46bb-bd0c-f27304b73763'
  },
  {
    _id: 'ff59419e-2b2e-430b-8a91-2a94e0018684',
    title: 'Dark and Stormy Night',
    genres: ['Art', 'Southern Gothic Fiction', 'Gothic', 'Guide / How-to'],
    publicationDate: '5/4/1968',
    publisher: 'Rhynyx',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '094516059-3',
    language: 'Haitian Creole',
    pageCount: 986,
    price: 21.03,
    format: ['Hardcover', 'E-Book'],
    authorId: '0a1d81a2-ab37-4940-8485-87b409caa8dc'
  },
  {
    _id: '72566041-56d9-47e2-802d-0dc35460b604',
    title: 'Tremors 4: The Legend Begins',
    genres: ['Fiction', 'Dystopian'],
    publicationDate: '6/11/1972',
    publisher: 'Yabox',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '917875341-4',
    language: 'Kyrgyz',
    pageCount: 4,
    price: 23.69,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'ff133d67-f674-493c-a301-55914ac411e2'
  },
  {
    _id: 'ca4ed038-0b29-4d5d-a504-3733562920c4',
    title: 'Laterna, ftoheia kai garyfallo',
    genres: ['Cookbook', 'Bildungsroman', 'Adventure', 'Romance'],
    publicationDate: '4/24/1904',
    publisher: 'Pixope',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '891128458-0',
    language: 'Pashto',
    pageCount: 256,
    price: 89.2,
    format: ['Hardcover', 'Paperback'],
    authorId: '6482a58f-e3fc-4be5-bbb7-6a22083c8978'
  },
  {
    _id: 'd4c13f09-27f5-4923-ba01-0f125cd58581',
    title: 'The Third Reich: The Rise & Fall',
    genres: [
      'Contemporary',
      'Memoir',
      'Personal Development',
      'Dystopian',
      'Thriller'
    ],
    publicationDate: '1/5/1948',
    publisher: 'Rooxo',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '034595475-0',
    language: 'Zulu',
    pageCount: 570,
    price: 57.46,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'd20d4350-ffc6-4125-959e-7a0e6b0480c4'
  },
  {
    _id: 'f4f2f66b-e7f2-4a2e-b0fe-dd3287a7f718',
    title: 'Plastic',
    genres: ['Romance', 'Art', 'Health', 'Bildungsroman', 'Memoir'],
    publicationDate: '11/30/1919',
    publisher: 'Jaxworks',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '870949847-8',
    language: 'Persian',
    pageCount: 863,
    price: 88.05,
    format: ['Hardcover'],
    authorId: '802d98db-0a9c-4539-8ad4-a6bc19385fb9'
  },
  {
    _id: 'eea2ad7a-c25d-4e5e-9c3a-bf10a9dd4307',
    title: 'Inside Job',
    genres: ['Cookbook'],
    publicationDate: '5/15/1914',
    publisher: 'Flipopia',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '425869784-2',
    language: 'Korean',
    pageCount: 155,
    price: 6.43,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '9471e481-42b7-4d27-bfe6-b67db8569b75'
  },
  {
    _id: 'f263541c-d0ca-448f-ba72-5ea770b64ca2',
    title: 'Washington Heights',
    genres: ['Horror', 'Humor'],
    publicationDate: '8/11/1967',
    publisher: 'Bubblemix',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '027816429-3',
    language: 'Telugu',
    pageCount: 174,
    price: 26.38,
    format: ['E-Book'],
    authorId: '72b50da8-f16d-4712-8523-b2ba089bd0bd'
  },
  {
    _id: '45142683-86ea-417e-a356-53358217d408',
    title: 'Total Recall',
    genres: ['Historical fiction'],
    publicationDate: '12/7/2013',
    publisher: 'Kwimbee',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '472704010-7',
    language: 'Swati',
    pageCount: 439,
    price: 30.89,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'd900d786-8c6b-4397-baf9-2a63650e5b75'
  },
  {
    _id: '352fd7d8-77d8-4d4f-b42a-17924ed5092b',
    title: 'First Beautiful Thing, The (La prima cosa bella)',
    genres: [
      'Science Fiction',
      'Motivational',
      'Southern Gothic Fiction',
      'Humor'
    ],
    publicationDate: '6/26/1911',
    publisher: 'Yakijo',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '640359084-7',
    language: 'Swedish',
    pageCount: 438,
    price: 8.84,
    format: ['Hardcover'],
    authorId: '888ab9d8-f91e-4640-a951-54100e50d454'
  },
  {
    _id: '2aae3621-a948-4897-97f6-3f60128fdb00',
    title: "Sophie's Choice",
    genres: ['Children’s', 'Thriller', 'Horror', 'Memoir'],
    publicationDate: '10/27/1998',
    publisher: 'Shuffletag',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '325310737-X',
    language: 'Finnish',
    pageCount: 944,
    price: 93.92,
    format: ['Hardcover'],
    authorId: '375ea9be-3e7e-4d00-a01c-b0a3a0148be6'
  },
  {
    _id: '1c54b523-9868-41fa-9635-dbe892410989',
    title: 'Confiance règne, La',
    genres: ['Art', 'Fiction'],
    publicationDate: '10/26/1935',
    publisher: 'Wordpedia',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '580147063-8',
    language: 'Kashmiri',
    pageCount: 94,
    price: 60.2,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '4de7f77b-dad4-4c05-af13-24f2b1dd4914'
  },
  {
    _id: 'a4f782e4-5b27-4cef-bbac-0b7fab12832a',
    title: 'Quartet',
    genres: ['Science Fiction', 'Guide / How-to', 'Horror'],
    publicationDate: '3/11/1990',
    publisher: 'Einti',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '597638546-X',
    language: 'Marathi',
    pageCount: 205,
    price: 70.86,
    format: ['Hardcover', 'E-Book'],
    authorId: 'f64a7965-962f-4085-a8f2-ff735c695fa1'
  },
  {
    _id: 'eea5b861-6664-4fea-8a47-c32a2ceeab7b',
    title: 'Torture Garden',
    genres: ['Memoir', 'Motivational', 'History'],
    publicationDate: '3/6/1905',
    publisher: 'Bubblemix',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '461342219-1',
    language: 'Lithuanian',
    pageCount: 402,
    price: 82.75,
    format: ['Paperback', 'Hardcover'],
    authorId: '375ea9be-3e7e-4d00-a01c-b0a3a0148be6'
  },
  {
    _id: '2e6a4387-909d-4632-ab16-89236a0d70ab',
    title: 'Trial by Jury',
    genres: ['Children’s', 'Health'],
    publicationDate: '3/20/1944',
    publisher: 'Devbug',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '511677093-1',
    language: 'Georgian',
    pageCount: 272,
    price: 22.22,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'f61c8a0e-2c22-434f-93c8-13b06c9c9de5'
  },
  {
    _id: '27e933e5-168b-4baf-b7fe-53eee82d31b9',
    title: 'Read My Lips (Sur mes lèvres)',
    genres: ['Paranormal', 'Contemporary', 'Fiction', 'Personal Development'],
    publicationDate: '11/14/2021',
    publisher: 'Mycat',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '601213987-X',
    language: 'Filipino',
    pageCount: 53,
    price: 63.01,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '55ee063d-df44-4f92-bed4-e7f833f0c1b8'
  },
  {
    _id: 'ade687ed-1ee8-4ee7-bf14-485810f2af16',
    title: 'Nanny McPhee',
    genres: [
      'Families & Relationships',
      'Mystery',
      'Romance',
      'Children’s',
      'Gothic'
    ],
    publicationDate: '1/4/1919',
    publisher: 'Trudoo',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '781674671-7',
    language: 'Kashmiri',
    pageCount: 162,
    price: 0.35,
    format: ['Hardcover'],
    authorId: '69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd'
  },
  {
    _id: '6e1c66e8-b120-4e22-bc77-1e91b837051e',
    title: 'Sanshiro Sugata Part Two (Judo Saga II) (Zoku Sugata Sanshirô)',
    genres: ['Gothic', 'Romance'],
    publicationDate: '8/12/2000',
    publisher: 'Mudo',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '484856959-1',
    language: 'Pashto',
    pageCount: 533,
    price: 43.55,
    format: ['Paperback'],
    authorId: '669c00a3-ff8b-4fb6-a913-f6bd5739a5b1'
  },
  {
    _id: '034ab888-b467-46a0-a72f-c0530c1fe347',
    title: 'Blue in the Face',
    genres: ['Self-help', 'Gothic'],
    publicationDate: '11/6/1989',
    publisher: 'Brainverse',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '285945505-1',
    language: 'Tswana',
    pageCount: 228,
    price: 90.91,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'fe943a18-1ea9-49ed-a5cd-30967dd95bd2'
  },
  {
    _id: '3876fd63-7c9c-46a0-8f72-933f65110942',
    title: 'RKO 281',
    genres: ['Cookbook', 'Humor'],
    publicationDate: '5/25/1920',
    publisher: 'Geba',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    isbn: '127100954-4',
    language: 'Dutch',
    pageCount: 149,
    price: 45.08,
    format: ['Hardcover'],
    authorId: '6ab99a6b-d96f-4b3b-9402-760e054e3c7d'
  },
  {
    _id: '7dc27b29-747f-46d9-bed3-8720e7cdd22b',
    title: 'Garden Lovers (Eedenistä pohjoiseen)',
    genres: ['Motivational', 'Horror', 'Cookbook'],
    publicationDate: '2/3/1925',
    publisher: 'Oozz',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '239566519-3',
    language: 'Malay',
    pageCount: 865,
    price: 55.47,
    format: ['Hardcover'],
    authorId: 'a4bb2a05-b8a2-4476-9d0a-32f49cabd137'
  },
  {
    _id: '9d0b4446-786d-44f8-b501-37f5788e3f8f',
    title: 'Gold',
    genres: ['Personal Development', 'Cookbook'],
    publicationDate: '1/25/1937',
    publisher: 'Myworks',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '490528410-4',
    language: 'Bulgarian',
    pageCount: 601,
    price: 16.44,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'f645d28a-670a-457a-b55f-a32876b8511d'
  },
  {
    _id: '9be4590a-eb18-43f5-b6a2-a8db8a314db2',
    title: 'Doughboys',
    genres: [
      'Adventure',
      'Children’s',
      'Art',
      'Personal Development',
      'Guide / How-to'
    ],
    publicationDate: '10/23/1963',
    publisher: 'Innotype',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '084650355-7',
    language: 'Macedonian',
    pageCount: 133,
    price: 61.85,
    format: ['Hardcover', 'Paperback'],
    authorId: 'c8ae1dbe-60e4-424e-9263-bb03447f6bbf'
  },
  {
    _id: '190453de-62dc-4320-8761-e49c027610da',
    title: 'Manson',
    genres: ['Children’s', 'Adventure', 'Paranormal', 'Humor'],
    publicationDate: '7/18/1946',
    publisher: 'Jatri',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '460226775-0',
    language: 'Macedonian',
    pageCount: 371,
    price: 98.1,
    format: ['E-Book', 'Paperback'],
    authorId: '75c77358-69d9-41f8-b6d1-760267ee7ebe'
  },
  {
    _id: 'b043b15d-9150-4af1-924b-824ae1ca5399',
    title: 'Santa Fe Trail',
    genres: ['Dystopian', 'Travel', 'Humor', 'Fiction'],
    publicationDate: '10/16/1928',
    publisher: 'Skynoodle',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '911284753-4',
    language: 'Portuguese',
    pageCount: 473,
    price: 38.87,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'e8f3227b-2449-42ab-a580-8a7a1c0b2b1e'
  },
  {
    _id: '67203720-17c3-40e5-8bcf-c1cafc0bcc5b',
    title: 'TMNT (Teenage Mutant Ninja Turtles)',
    genres: ['Fiction', 'Cookbook'],
    publicationDate: '8/31/1966',
    publisher: 'Flipbug',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '836869052-8',
    language: 'Malayalam',
    pageCount: 484,
    price: 42.8,
    format: ['Paperback', 'E-Book'],
    authorId: 'e1f96db2-1e3f-4423-a896-6e81b6619653'
  },
  {
    _id: 'b22aa257-84f1-4c60-bbed-9ed979e39b3a',
    title: 'Thrilla in Manila',
    genres: ['Fiction', 'Art', 'Humor', 'History'],
    publicationDate: '3/22/1915',
    publisher: 'Kazio',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '719353391-6',
    language: 'Montenegrin',
    pageCount: 696,
    price: 26.54,
    format: ['Hardcover'],
    authorId: '21781c41-f8c7-41c7-9892-d5e2fb698458'
  },
  {
    _id: '77ab2171-7532-4d4f-8205-743e49ef93ee',
    title: 'White Frog',
    genres: ['Self-help'],
    publicationDate: '12/21/2001',
    publisher: 'Wordware',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '263867155-X',
    language: 'Gagauz',
    pageCount: 814,
    price: 25.77,
    format: ['E-Book', 'Paperback'],
    authorId: 'bae5536c-ae91-477f-a7eb-bcd11873baaf'
  },
  {
    _id: 'fc21589d-1d5a-483e-8a32-668bb849ab2b',
    title: 'Rape Me (Baise-moi)',
    genres: ['Art', 'Southern Gothic Fiction'],
    publicationDate: '1/17/1905',
    publisher: 'Babbleset',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '596072538-X',
    language: 'Arabic',
    pageCount: 619,
    price: 81.83,
    format: ['E-Book'],
    authorId: 'efa93868-002b-4cf5-a332-1a61c642e834'
  },
  {
    _id: 'e282f7ec-644f-4ddc-b2c4-5b4a90b9d5c9',
    title: "Angela's Ashes",
    genres: ['Adventure'],
    publicationDate: '8/24/1966',
    publisher: 'Jabberbean',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '057110898-9',
    language: 'Albanian',
    pageCount: 767,
    price: 4.63,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '23896b07-323f-4865-99fb-cb2f5ee11881'
  },
  {
    _id: 'e61da3ab-7bcc-45d2-89e2-b2a1d0b75620',
    title: 'Mad Detective (Sun taam)',
    genres: ['Contemporary', 'Fiction', 'Romance', 'Humor', 'Motivational'],
    publicationDate: '12/27/1968',
    publisher: 'Zoombeat',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '813162794-2',
    language: 'Pashto',
    pageCount: 293,
    price: 46.94,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'e8f3227b-2449-42ab-a580-8a7a1c0b2b1e'
  },
  {
    _id: '41883261-e453-4723-829a-e3b4f4b99b67',
    title: 'In Bloom (Grzeli nateli dgeebi)',
    genres: [
      'Mystery',
      'Romance',
      'Science Fiction',
      'Memoir',
      'Bildungsroman'
    ],
    publicationDate: '8/1/2008',
    publisher: 'Gabvine',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '693535279-7',
    language: 'Chinese',
    pageCount: 248,
    price: 67.45,
    format: ['Paperback', 'E-Book'],
    authorId: 'c7297411-b3a3-4704-bcd8-48f097c65d5f'
  },
  {
    _id: '8263b518-2e17-4ba2-8291-d265644056e4',
    title: '12 Rounds',
    genres: ['Humor', 'Personal Development', 'Bildungsroman'],
    publicationDate: '3/18/1956',
    publisher: 'Thoughtblab',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '389239785-6',
    language: 'Indonesian',
    pageCount: 581,
    price: 29.59,
    format: ['Paperback', 'E-Book'],
    authorId: '2dac4009-8b45-4707-8701-2a5263d329bd'
  },
  {
    _id: '0b9a8bbb-90f4-42f5-b28d-0d0abc5815cd',
    title: 'Sometimes in April',
    genres: [
      'Health',
      'Motivational',
      'Personal Development',
      'Dystopian',
      'Horror'
    ],
    publicationDate: '1/15/1988',
    publisher: 'Realcube',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '274183876-3',
    language: 'Fijian',
    pageCount: 292,
    price: 39.8,
    format: ['Paperback', 'Hardcover'],
    authorId: '828b565e-3494-4d6b-b49c-57fd26fd7c06'
  },
  {
    _id: 'afa1edeb-4954-461b-9a80-6d5cd5babed8',
    title: 'All Is Lost',
    genres: ['Paranormal', 'History', 'Cookbook', 'Self-help'],
    publicationDate: '1/25/1987',
    publisher: 'Centimia',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '726668891-4',
    language: 'Latvian',
    pageCount: 866,
    price: 79.03,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '4825d81f-42c5-4bee-810b-4ae6f917067e'
  },
  {
    _id: '5f787949-5365-4049-94c8-467cbd7b368d',
    title: 'Halls of Montezuma',
    genres: [
      'Historical fiction',
      'Personal Development',
      'Fiction',
      'Motivational',
      'Humor'
    ],
    publicationDate: '8/23/1962',
    publisher: 'Centimia',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '255057371-4',
    language: 'West Frisian',
    pageCount: 781,
    price: 66.97,
    format: ['Hardcover', 'E-Book'],
    authorId: 'ba651cf2-8c94-459f-96f6-6a44aa62eb6f'
  },
  {
    _id: '0d708b05-6381-479e-b80c-a48fe1e0a447',
    title: 'An Amazing Couple',
    genres: [
      'Families & Relationships',
      'Historical fiction',
      'Motivational',
      'Health'
    ],
    publicationDate: '7/14/1946',
    publisher: 'Jatri',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '190641040-2',
    language: 'Sotho',
    pageCount: 593,
    price: 65.36,
    format: ['Paperback', 'E-Book'],
    authorId: 'cd66289a-dd71-4130-b2bc-19723cf0fa08'
  },
  {
    _id: '7658ab4d-5d56-44d2-920e-751c1500e99c',
    title: "My Mother's Castle (Château de ma mère, Le)",
    genres: ['Southern Gothic Fiction'],
    publicationDate: '8/9/1900',
    publisher: 'Midel',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    isbn: '522606631-7',
    language: 'Malagasy',
    pageCount: 365,
    price: 87.91,
    format: ['Hardcover'],
    authorId: 'c4fab3c3-e39c-4705-afe3-f3db0a3e141c'
  },
  {
    _id: '88eb978a-8bc7-4d37-afa4-f94dfdb8f6fa',
    title: 'New Rose Hotel',
    genres: ['Cookbook', 'History', 'Self-help', 'Thriller'],
    publicationDate: '4/11/1989',
    publisher: 'Abatz',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '991601096-X',
    language: 'Tok Pisin',
    pageCount: 840,
    price: 30.14,
    format: ['E-Book', 'Hardcover'],
    authorId: 'e1f96db2-1e3f-4423-a896-6e81b6619653'
  },
  {
    _id: '971b9a9b-a706-4b0c-8a87-dda3e9146ead',
    title: 'The Tunnel of Love',
    genres: ['Health'],
    publicationDate: '9/15/1950',
    publisher: 'Yacero',
    summary: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '183549736-5',
    language: 'Kazakh',
    pageCount: 778,
    price: 72.51,
    format: ['Paperback', 'E-Book'],
    authorId: '051a48a8-f65f-465a-bb09-53ec58b4ef43'
  },
  {
    _id: 'e0b75c0e-68e9-4256-9440-205a820e2591',
    title: 'Irene in Time',
    genres: ['Adventure', 'Children’s', 'History', 'Paranormal', 'Fiction'],
    publicationDate: '5/10/1955',
    publisher: 'Eamia',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '983741171-6',
    language: 'Tsonga',
    pageCount: 740,
    price: 44.97,
    format: ['E-Book'],
    authorId: '8cfc3b77-0fbe-48c7-84f5-2bd95dc93cd6'
  },
  {
    _id: '75acd5e1-c769-4b17-a8f9-248e3cb94f00',
    title: "Can't Stop the Music",
    genres: [
      'Families & Relationships',
      'Southern Gothic Fiction',
      'Historical fiction'
    ],
    publicationDate: '6/12/1971',
    publisher: 'Jaxworks',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '934659092-0',
    language: 'Yiddish',
    pageCount: 731,
    price: 3.72,
    format: ['E-Book'],
    authorId: 'd19b762d-b7ed-436a-babc-ae19344a7483'
  },
  {
    _id: '09c449f0-b0ec-4f74-bdd6-580afb552bc0',
    title: 'Run for Cover',
    genres: ['Self-help', 'Art', 'Thriller', 'History'],
    publicationDate: '8/21/1988',
    publisher: 'Skipstorm',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '858655201-1',
    language: 'Greek',
    pageCount: 665,
    price: 83.61,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '6ab99a6b-d96f-4b3b-9402-760e054e3c7d'
  },
  {
    _id: '66a83120-999c-4d6f-9803-b6320f477eb6',
    title: 'Little Otik (Otesánek)',
    genres: ['Fiction', 'Southern Gothic Fiction', 'Bildungsroman'],
    publicationDate: '2/17/2002',
    publisher: 'Jabberbean',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '842665243-3',
    language: 'Albanian',
    pageCount: 113,
    price: 94.58,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'f36cd039-12da-4747-9bb8-ec8666fe62f3'
  },
  {
    _id: '979f619a-6abb-40f1-a34f-7e7ec5eef94c',
    title: 'Kaleidoscope',
    genres: [
      'Guide / How-to',
      'History',
      'Science Fiction',
      'Gothic',
      'Dystopian'
    ],
    publicationDate: '4/8/2017',
    publisher: 'Kanoodle',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '796454210-9',
    language: 'Finnish',
    pageCount: 486,
    price: 25.18,
    format: ['Paperback'],
    authorId: '954b477c-4d10-42b1-96c9-59dbedbf4c54'
  },
  {
    _id: 'b5b2e9d0-c26d-4f5f-aa67-e76dd8fe884b',
    title: 'Misérables, Les',
    genres: ['History', 'Travel', 'Horror'],
    publicationDate: '2/9/1902',
    publisher: 'Kazio',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '720099296-8',
    language: 'Finnish',
    pageCount: 685,
    price: 67.44,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '96d8604e-0e99-4bd1-bcc6-1a0800b317c2'
  },
  {
    _id: 'a94cd8e8-3edd-4e4a-8ed6-03a4319dd273',
    title: 'Mother of Mine (Äideistä parhain)',
    genres: ['Memoir', 'Contemporary', 'Fiction'],
    publicationDate: '9/3/1979',
    publisher: 'Gabspot',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '891114379-0',
    language: 'Czech',
    pageCount: 449,
    price: 78.07,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '0e603c9b-8801-48fe-95ec-312096990ca8'
  },
  {
    _id: 'c2780c93-2255-4800-8b7c-b7f6ddb69279',
    title: 'Maradona, the Hand of God (Maradona, la mano di Dio)',
    genres: ['Romance', 'Contemporary', 'Health'],
    publicationDate: '6/15/1914',
    publisher: 'Kayveo',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '061774379-7',
    language: 'Oriya',
    pageCount: 910,
    price: 57.05,
    format: ['Paperback'],
    authorId: '2f384f94-3958-4894-a2d3-5eaa1a8ee8f3'
  },
  {
    _id: '81a08b3f-d034-4016-9953-b9ceb6443aa4',
    title: 'Lost in Translation',
    genres: ['Travel'],
    publicationDate: '10/12/1960',
    publisher: 'Wikido',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '209190867-3',
    language: 'Korean',
    pageCount: 92,
    price: 22.03,
    format: ['Paperback'],
    authorId: 'fd909907-9c4f-4223-ad04-0fb5a187f30c'
  },
  {
    _id: 'ec75116f-a7c6-45b6-b25f-0cc5441da031',
    title: 'High on Crack Street: Lost Lives in Lowell',
    genres: ['Horror', 'Southern Gothic Fiction', 'Children’s'],
    publicationDate: '11/19/1972',
    publisher: 'Zooxo',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '117710758-9',
    language: 'Estonian',
    pageCount: 933,
    price: 6.79,
    format: ['Hardcover', 'E-Book'],
    authorId: '59d00508-ed3b-44ec-ab33-6629eff4c5ae'
  },
  {
    _id: 'f33a65a8-d11a-4ccf-bd40-583239b6f9ed',
    title: 'Pittsburgh',
    genres: ['Fiction', 'Dystopian', 'Families & Relationships'],
    publicationDate: '11/22/1911',
    publisher: 'Gigazoom',
    summary:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '274655099-7',
    language: 'Pashto',
    pageCount: 183,
    price: 33.65,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'ecdd3fb8-90dc-4b71-9ed4-f279ec36f381'
  },
  {
    _id: 'fcb4af38-7e60-4d1a-aa64-6237c01b87d6',
    title: 'Living Daylights, The',
    genres: ['Guide / How-to', 'Romance', 'Fiction', 'Dystopian'],
    publicationDate: '11/11/1947',
    publisher: 'Jazzy',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '452993375-X',
    language: 'Filipino',
    pageCount: 695,
    price: 13.71,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '41f61915-3942-4d1b-9a8d-6b4d6f31def3'
  },
  {
    _id: 'c9371fba-ad5b-4fc9-ae92-99eeee594b2c',
    title: 'Barb Wire',
    genres: ['Art', 'Children’s', 'Personal Development', 'Health'],
    publicationDate: '5/23/1950',
    publisher: 'Realcube',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '616537472-7',
    language: 'Hebrew',
    pageCount: 766,
    price: 28.97,
    format: ['E-Book', 'Hardcover'],
    authorId: '64404e92-0886-4e7a-9fbf-d7c3e66c8c01'
  },
  {
    _id: '7c379fde-7e84-4b76-8223-0ff03b9afbe7',
    title: 'Night at the Roxbury, A',
    genres: ['Adventure'],
    publicationDate: '8/4/1945',
    publisher: 'Realcube',
    summary:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '821018202-1',
    language: 'Tsonga',
    pageCount: 95,
    price: 48.14,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'cdf048ac-6874-45e9-8a93-2f561c22ed4e'
  },
  {
    _id: 'b5794cc7-d7aa-423f-b0af-d1904d75a266',
    title: 'Little Girl (La pivellina)',
    genres: ['Horror', 'Romance', 'Travel', 'Humor'],
    publicationDate: '6/24/1950',
    publisher: 'Mybuzz',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '975896678-2',
    language: 'Bislama',
    pageCount: 111,
    price: 86.77,
    format: ['Hardcover'],
    authorId: 'ff58ae27-6e52-4231-8ae5-daa957eebac3'
  },
  {
    _id: 'd50398a5-1fd4-4a2c-9c6e-ec1c20ad1d2a',
    title: 'Redemption: For Robbing the Dead',
    genres: [
      'Personal Development',
      'Self-help',
      'Motivational',
      'Contemporary',
      'Families & Relationships'
    ],
    publicationDate: '3/6/1983',
    publisher: 'Skyvu',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '435368760-3',
    language: 'Armenian',
    pageCount: 901,
    price: 91.66,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'bf51dd35-1eb4-4ba7-8ad2-36e726801715'
  },
  {
    _id: '3509feff-8dff-4564-9f76-f1150693845a',
    title: 'Hitler: The Rise of Evil',
    genres: ['Gothic'],
    publicationDate: '11/2/1935',
    publisher: 'Leenti',
    summary:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '715931568-5',
    language: 'Amharic',
    pageCount: 291,
    price: 79.97,
    format: ['Paperback', 'Hardcover'],
    authorId: '3d5ea1f5-a929-47c0-b92d-b6192fa7ad1e'
  },
  {
    _id: 'dad4d51b-930f-438c-a452-b99a22b9a611',
    title: 'Witches, The (Le streghe)',
    genres: ['Children’s', 'Romance', 'Science Fiction'],
    publicationDate: '7/29/1908',
    publisher: 'Meembee',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '146438047-3',
    language: 'Quechua',
    pageCount: 459,
    price: 16.08,
    format: ['E-Book', 'Paperback'],
    authorId: '2dac4009-8b45-4707-8701-2a5263d329bd'
  },
  {
    _id: 'a7d6c28b-7d7a-449d-81dc-2eaabccf0447',
    title: 'Sherlock Holmes: Terror by Night',
    genres: ['Self-help', 'Children’s', 'History', 'Adventure'],
    publicationDate: '9/4/1983',
    publisher: 'Linkbridge',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '871968570-X',
    language: 'Pashto',
    pageCount: 945,
    price: 90.18,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'ba5fb3bd-840b-4590-8176-6e1ec29ff1f7'
  },
  {
    _id: 'bb6e6c72-9293-4d11-baaa-7e2fefd594c7',
    title: 'Bye Bye Brazil (Bye Bye Brasil)',
    genres: ['Families & Relationships', 'Mystery'],
    publicationDate: '11/9/2009',
    publisher: 'Katz',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '155487292-8',
    language: 'Korean',
    pageCount: 842,
    price: 74.49,
    format: ['Paperback'],
    authorId: 'a5866e42-582e-43e8-869f-2291dab11740'
  },
  {
    _id: '58efb4a9-eeeb-4c16-acce-e421f5bb4955',
    title: 'Queen: Days of Our Lives',
    genres: ['Contemporary', 'Families & Relationships', 'Memoir'],
    publicationDate: '10/9/1904',
    publisher: 'Muxo',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '947181277-1',
    language: 'Marathi',
    pageCount: 493,
    price: 29.03,
    format: ['Hardcover', 'E-Book'],
    authorId: '4d9851c6-3ce4-4d0f-9331-a61c4198ab8d'
  },
  {
    _id: '45d4e4e0-e4e8-4f08-9b00-83742067d5f7',
    title: 'Short Film About Killing, A (Krótki film o zabijaniu)',
    genres: ['Travel', 'Gothic', 'Historical fiction', 'Personal Development'],
    publicationDate: '4/12/1960',
    publisher: 'Skimia',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '201901000-3',
    language: 'Northern Sotho',
    pageCount: 720,
    price: 22.72,
    format: ['Hardcover'],
    authorId: 'd8d43bcb-285b-492b-a3eb-d599563b6e8e'
  },
  {
    _id: '18484004-e517-4a39-9e65-20dec8480ba5',
    title: 'Authors Anonymous',
    genres: ['Paranormal', 'Fiction', 'Guide / How-to'],
    publicationDate: '10/15/1939',
    publisher: 'Livetube',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '198366600-9',
    language: 'Telugu',
    pageCount: 48,
    price: 99.22,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '967a589c-e1d8-443d-a2da-1ebb6b6607db'
  },
  {
    _id: '343787eb-5819-4804-8451-840163cbfca4',
    title: 'The Killers',
    genres: ['Children’s', 'History', 'Contemporary'],
    publicationDate: '9/11/1904',
    publisher: 'Dynava',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '755629888-4',
    language: 'Hungarian',
    pageCount: 55,
    price: 24.25,
    format: ['Hardcover', 'Paperback'],
    authorId: '27025bc3-36b0-4268-a346-e985f74cab78'
  },
  {
    _id: 'dee5c78c-a864-4346-97fe-0d21cecc073b',
    title: 'The Hunger Games: Mockingjay - Part 1',
    genres: ['Thriller', 'Historical fiction'],
    publicationDate: '7/13/2017',
    publisher: 'Oba',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '221139357-8',
    language: 'Korean',
    pageCount: 99,
    price: 9.75,
    format: ['Paperback', 'Hardcover'],
    authorId: '6a13b638-c3aa-483f-a242-1625cf76fe29'
  },
  {
    _id: '717200ef-e58f-42a7-82cd-4a27403e52fd',
    title: 'Puppet Masters, The',
    genres: ['Dystopian', 'Health', 'Contemporary', 'Paranormal', 'Humor'],
    publicationDate: '7/25/1962',
    publisher: 'Yakijo',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '853235226-X',
    language: 'Punjabi',
    pageCount: 506,
    price: 74.35,
    format: ['Hardcover'],
    authorId: 'f3159d8b-d89b-4741-a77f-ea80b0998491'
  },
  {
    _id: 'bd5f4731-ab3d-47e5-afb5-074fb042ded9',
    title: 'Played',
    genres: ['Humor', 'Children’s'],
    publicationDate: '8/24/1919',
    publisher: 'Teklist',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '035845603-7',
    language: 'Filipino',
    pageCount: 986,
    price: 53.08,
    format: ['Paperback', 'E-Book'],
    authorId: '0396f370-f0b1-492b-8200-5003b76e66b2'
  },
  {
    _id: 'd042887f-f235-464a-8094-f61b3372ac1d',
    title: 'Private Lessons',
    genres: ['Cookbook'],
    publicationDate: '12/20/1988',
    publisher: 'Wikibox',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '588058892-0',
    language: 'Italian',
    pageCount: 835,
    price: 37.2,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '32666108-ded7-46e9-abef-7e1c58204177'
  },
  {
    _id: 'cc3fb5fe-28b9-4309-8271-298d32bf33e9',
    title: 'Diên Biên Phú',
    genres: ['Bildungsroman', 'Historical fiction', 'Health', 'Art'],
    publicationDate: '10/3/1904',
    publisher: 'Kazio',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '295690723-9',
    language: 'Italian',
    pageCount: 879,
    price: 79.15,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '095705f2-38e9-431f-9f75-7a32f09b9107'
  },
  {
    _id: 'bd78cb3f-4ffa-4e4e-b683-d15682f83705',
    title: "Pain in the Ass, A (L'emmerdeur)",
    genres: ['Adventure', 'Paranormal'],
    publicationDate: '10/19/1913',
    publisher: 'Vipe',
    summary: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '970237739-0',
    language: 'Swedish',
    pageCount: 711,
    price: 55.89,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'd2198f3f-847e-413d-9775-c97e03a521d3'
  },
  {
    _id: '51c1094a-34ee-4f1f-b282-9005c0df2888',
    title: 'Lucky Break (a.k.a. Paperback Romance)',
    genres: ['Motivational'],
    publicationDate: '11/1/1977',
    publisher: 'Fadeo',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '607796767-X',
    language: 'Luxembourgish',
    pageCount: 841,
    price: 92.15,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'f7ca40f3-7532-4e30-8294-033621c53d6e'
  },
  {
    _id: '637a2895-faf9-4ff6-8aa2-df7e11d99527',
    title: 'Moulin Rouge',
    genres: ['Travel', 'Bildungsroman', 'Mystery', 'Science Fiction'],
    publicationDate: '8/27/1953',
    publisher: 'Dazzlesphere',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '150053585-0',
    language: 'Tsonga',
    pageCount: 48,
    price: 76.44,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: '9c8568f1-4fdc-410d-b0ad-eff71ced0abe'
  },
  {
    _id: 'ae7a5ff1-084d-4a0c-9cba-2dd20cea6f41',
    title: 'Card Player, The (Il cartaio)',
    genres: ['Children’s', 'Thriller'],
    publicationDate: '7/29/1943',
    publisher: 'Topdrive',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '288626026-6',
    language: 'Persian',
    pageCount: 273,
    price: 40.81,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '4d9851c6-3ce4-4d0f-9331-a61c4198ab8d'
  },
  {
    _id: 'a1a68732-c869-412f-aa5c-6af7a86ab864',
    title: 'Dead Poets Society',
    genres: ['Bildungsroman', 'Children’s'],
    publicationDate: '2/11/2013',
    publisher: 'Zooveo',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '899215834-3',
    language: 'Tswana',
    pageCount: 903,
    price: 50.22,
    format: ['Hardcover', 'E-Book'],
    authorId: '6ab99a6b-d96f-4b3b-9402-760e054e3c7d'
  },
  {
    _id: 'caf12856-d93a-4ec2-9d2a-af5f666b389c',
    title: 'Bird of the Air, A (Loop, The)',
    genres: [
      'Families & Relationships',
      'Guide / How-to',
      'Gothic',
      'Memoir',
      'Personal Development'
    ],
    publicationDate: '8/25/2003',
    publisher: 'Geba',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '806148707-1',
    language: 'Tetum',
    pageCount: 122,
    price: 4.25,
    format: ['Paperback', 'E-Book'],
    authorId: 'de267c83-3c12-44a1-b786-a8afea541bbd'
  },
  {
    _id: '2abf6584-7968-4609-893e-b50be9b09c64',
    title: 'Castles in the Sky',
    genres: ['Dystopian'],
    publicationDate: '6/24/1922',
    publisher: 'Npath',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '875488021-1',
    language: 'Finnish',
    pageCount: 508,
    price: 56.47,
    format: ['Paperback'],
    authorId: 'f5131063-5aae-47e7-813b-e7e1d939e551'
  },
  {
    _id: 'b91aa740-6355-4008-a69f-2a4554c5a2e3',
    title: "Benny's Video",
    genres: ['Personal Development'],
    publicationDate: '8/2/1910',
    publisher: 'Yakidoo',
    summary:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '532669746-7',
    language: 'Amharic',
    pageCount: 410,
    price: 21.9,
    format: ['Hardcover', 'E-Book'],
    authorId: '9e447a26-aaaa-41e6-bb04-241b552dcbbc'
  },
  {
    _id: '60733e1c-63f0-44cf-bdb2-faadf61cdbf2',
    title: 'Mr. Turner',
    genres: ['Memoir', 'Contemporary', 'History', 'Bildungsroman'],
    publicationDate: '5/20/1997',
    publisher: 'Roomm',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    isbn: '699359390-4',
    language: 'Malagasy',
    pageCount: 18,
    price: 32.4,
    format: ['Paperback'],
    authorId: '64eb6b8c-309a-4b79-947f-d1e58a4a5a69'
  },
  {
    _id: '7c0ebd45-8365-44fb-97c5-60b135b0fcb5',
    title: 'Underground: The Julian Assange Story',
    genres: ['Horror', 'Memoir', 'Romance'],
    publicationDate: '12/26/1973',
    publisher: 'Geba',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '547837339-7',
    language: 'Filipino',
    pageCount: 693,
    price: 89.17,
    format: ['Paperback'],
    authorId: '86abb841-936f-4afe-bce9-73199f45565f'
  },
  {
    _id: '4ed417ac-67d2-4462-933c-cb517008fb4e',
    title:
      'Lone Wolf and Cub: Baby Cart at the River Styx (Kozure Ôkami: Sanzu no kawa no ubaguruma)',
    genres: ['Contemporary', 'History'],
    publicationDate: '10/13/1999',
    publisher: 'Centimia',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '723230847-7',
    language: 'Ndebele',
    pageCount: 778,
    price: 57.06,
    format: ['Hardcover', 'Paperback'],
    authorId: 'bbf52289-621d-4b37-9e51-3612587aa12b'
  },
  {
    _id: '980e45f2-7040-4b76-9202-0c1c2ba7e8d6',
    title: 'Animal Farm',
    genres: ['Health', 'Art', 'Cookbook'],
    publicationDate: '1/1/1957',
    publisher: 'Voolith',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '850078329-X',
    language: 'Zulu',
    pageCount: 785,
    price: 89.34,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '0563527e-813b-40b6-8333-1337f646f49e'
  },
  {
    _id: '50f56eea-200d-48da-a771-8e7039cd17ad',
    title: '8th Wonderland',
    genres: ['Memoir', 'Mystery', 'Contemporary', 'Adventure'],
    publicationDate: '1/13/1980',
    publisher: 'Eadel',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '786118598-2',
    language: 'Tetum',
    pageCount: 470,
    price: 32.05,
    format: ['Paperback', 'Hardcover'],
    authorId: '7e3561ac-baa5-4657-a822-5e8225f3f860'
  },
  {
    _id: '20237537-787f-425c-b690-b68ef2373f5a',
    title:
      "Midsummer Night's Party, A (Midsummer of Love, A) (Sommaren med Göran)",
    genres: ['Fiction', 'Thriller'],
    publicationDate: '9/2/1933',
    publisher: 'Jabbersphere',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '966279835-8',
    language: 'Māori',
    pageCount: 122,
    price: 54.57,
    format: ['E-Book'],
    authorId: '1fdccafd-71f6-43f4-bd87-32164f1441a9'
  },
  {
    _id: '7185ed19-229e-45fa-9c53-aca809430618',
    title: 'Camille',
    genres: [
      'Contemporary',
      'Cookbook',
      'Historical fiction',
      'Health',
      'Travel'
    ],
    publicationDate: '8/17/1987',
    publisher: 'Eazzy',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '987108715-2',
    language: 'Burmese',
    pageCount: 145,
    price: 15.01,
    format: ['Hardcover'],
    authorId: 'f3159d8b-d89b-4741-a77f-ea80b0998491'
  },
  {
    _id: '7dd79318-dda0-4fe4-bebe-eed94e900bab',
    title: 'Lesson in Love, A (En lektion i kärlek)',
    genres: ['Contemporary', 'Memoir', 'History', 'Science Fiction', 'Health'],
    publicationDate: '11/30/1947',
    publisher: 'Topicware',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '067557858-2',
    language: 'Gagauz',
    pageCount: 852,
    price: 95.13,
    format: ['Hardcover'],
    authorId: '145e6abe-f17b-477a-b5d6-9468c69df8b4'
  },
  {
    _id: 'a70bfd55-fc3b-4586-a9ec-56e7ef695baf',
    title: 'Anaconda',
    genres: ['Travel', 'Science Fiction', 'Health', 'Motivational'],
    publicationDate: '1/5/1916',
    publisher: 'Omba',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '200990246-7',
    language: 'Hindi',
    pageCount: 775,
    price: 8.88,
    format: ['Hardcover'],
    authorId: 'ed35bc3b-f204-4cd1-bc34-ad364e06fc39'
  },
  {
    _id: 'b4e9ed2c-a072-45a2-8d53-65155d624865',
    title: 'That Was Then... This Is Now',
    genres: ['Personal Development', 'Horror', 'Historical fiction'],
    publicationDate: '6/7/1955',
    publisher: 'Mita',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '416684974-3',
    language: 'Assamese',
    pageCount: 4,
    price: 27.83,
    format: ['E-Book'],
    authorId: '8894c41b-2435-4a92-b513-a385163429e7'
  },
  {
    _id: '95391dd2-868e-4603-9044-0021548543e7',
    title: 'Aladdin',
    genres: [
      'Families & Relationships',
      'Children’s',
      'Art',
      'Historical fiction'
    ],
    publicationDate: '12/2/1988',
    publisher: 'Wordpedia',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '459526260-4',
    language: 'Polish',
    pageCount: 188,
    price: 22.73,
    format: ['Paperback', 'E-Book'],
    authorId: 'd104aabb-d820-4110-9cfb-1f9a7ad51d76'
  },
  {
    _id: '3457f523-c031-4b13-87bf-785a0e5013f9',
    title: 'Métamorphose des cloportes, La',
    genres: ['Science Fiction', 'Self-help'],
    publicationDate: '6/9/1983',
    publisher: 'Divape',
    summary:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '658470641-9',
    language: 'Lao',
    pageCount: 658,
    price: 9.87,
    format: ['E-Book', 'Hardcover'],
    authorId: 'd456d4d6-1ea4-4726-a758-538082d6a01d'
  },
  {
    _id: '19632665-80df-434b-9bc9-6266fd363b1b',
    title: 'Foreigner, The',
    genres: ['Adventure'],
    publicationDate: '6/11/1997',
    publisher: 'Ozu',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '369567437-7',
    language: 'Oriya',
    pageCount: 208,
    price: 40.1,
    format: ['E-Book', 'Hardcover'],
    authorId: '5a7b0b23-8856-4a4c-9daa-2642ac0a44f0'
  },
  {
    _id: 'b375fdea-2f74-4414-8e16-651f44f9338b',
    title: 'Mei and the Kittenbus',
    genres: ['Motivational', 'Romance', 'Adventure', 'Memoir'],
    publicationDate: '11/3/2020',
    publisher: 'Yodo',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '085184246-1',
    language: 'Finnish',
    pageCount: 610,
    price: 62.45,
    format: ['Hardcover'],
    authorId: '963cf4e5-5093-404c-bab8-92a74a1a9ba6'
  },
  {
    _id: '2f343d7b-e52d-4b79-946b-bca5fe9bdbaa',
    title: 'Dottie Gets Spanked',
    genres: ['Science Fiction', 'Fiction', 'Thriller', 'Dystopian'],
    publicationDate: '12/21/1950',
    publisher: 'Divavu',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '952545562-9',
    language: 'Aymara',
    pageCount: 163,
    price: 89.91,
    format: ['Hardcover', 'Paperback'],
    authorId: '843c38ae-9d74-44e1-aca2-edce2ca95280'
  },
  {
    _id: 'f718260f-8911-473b-8f02-78240066ea4b',
    title: "Look Who's Talking",
    genres: [
      'Children’s',
      'Personal Development',
      'Southern Gothic Fiction',
      'Families & Relationships',
      'Self-help'
    ],
    publicationDate: '9/27/1913',
    publisher: 'Kwideo',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '796501349-5',
    language: 'Marathi',
    pageCount: 830,
    price: 26.21,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '7cdbc5ad-12b8-428d-9ab8-57d117328403'
  },
  {
    _id: 'd87f8b98-292a-4201-8208-7b8261eeb3ea',
    title: 'Buying the Cow',
    genres: [
      'Contemporary',
      'Motivational',
      'Health',
      'Personal Development',
      'Gothic'
    ],
    publicationDate: '1/3/2007',
    publisher: 'Skippad',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '945356391-9',
    language: 'Korean',
    pageCount: 604,
    price: 90.43,
    format: ['E-Book'],
    authorId: 'cc37f78d-b034-4e43-8add-42055c477612'
  },
  {
    _id: '1d7cf7ca-7883-47cb-907b-8f65f2dd9e12',
    title: 'Hybrid',
    genres: ['Horror', 'Cookbook', 'Contemporary', 'Art', 'Historical fiction'],
    publicationDate: '9/17/1974',
    publisher: 'Wordify',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '498078800-9',
    language: 'Azeri',
    pageCount: 685,
    price: 60.61,
    format: ['Paperback'],
    authorId: '669c00a3-ff8b-4fb6-a913-f6bd5739a5b1'
  },
  {
    _id: '93b4e3c2-80a6-43f0-b833-2fccc0a064da',
    title: 'North Face (Nordwand)',
    genres: ['Humor', 'Self-help', 'Paranormal', 'Children’s'],
    publicationDate: '2/3/1955',
    publisher: 'Zoombeat',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '384487403-8',
    language: 'Khmer',
    pageCount: 977,
    price: 80.67,
    format: ['E-Book', 'Paperback', 'Hardcover'],
    authorId: 'f7ca40f3-7532-4e30-8294-033621c53d6e'
  },
  {
    _id: '567d655e-63c0-4482-8934-ca41c5747c44',
    title: 'Broadcast News',
    genres: ['Bildungsroman', 'Children’s'],
    publicationDate: '11/8/1968',
    publisher: 'Flashspan',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '648426150-4',
    language: 'Swati',
    pageCount: 280,
    price: 60.28,
    format: ['E-Book'],
    authorId: 'b9565135-e7ff-46b6-a864-df9a80f289cf'
  },
  {
    _id: '345836c5-e333-45c8-8ca8-ae9cef9ed3ce',
    title: 'Monday Night Mayhem',
    genres: ['Personal Development', 'Horror'],
    publicationDate: '11/10/1931',
    publisher: 'Vidoo',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '341383313-8',
    language: 'Catalan',
    pageCount: 667,
    price: 26.62,
    format: ['Hardcover', 'E-Book'],
    authorId: '8f9d07e3-a915-4f54-9fe8-fec431e9c4a7'
  },
  {
    _id: '3527706c-579b-4a27-b2da-ab018c76f7ff',
    title: 'NeverEnding Story II: The Next Chapter, The',
    genres: ['Families & Relationships'],
    publicationDate: '1/28/1973',
    publisher: 'Vitz',
    summary: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '441397003-9',
    language: 'Danish',
    pageCount: 102,
    price: 77.32,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: '28447a7d-7c71-43a2-a1fc-2db73af9debc',
    title: 'My Blue Heaven',
    genres: ['Personal Development'],
    publicationDate: '6/10/1973',
    publisher: 'Fivebridge',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '399249298-2',
    language: 'Tamil',
    pageCount: 487,
    price: 64.49,
    format: ['Paperback'],
    authorId: '7f7e7b51-d379-46b3-a316-28c4f0d11791'
  },
  {
    _id: '6c333f44-4d09-40a9-839c-f7e3fb540fe1',
    title: 'Fury',
    genres: ['Mystery', 'Memoir', 'Romance'],
    publicationDate: '5/16/1989',
    publisher: 'Eire',
    summary:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    isbn: '934385852-3',
    language: 'Croatian',
    pageCount: 720,
    price: 4.37,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'e258bb2e-5ac3-42d8-8a56-76b681dff893'
  },
  {
    _id: 'f6d1b1c0-ab7a-4cf1-91a7-79439e84c505',
    title: 'Black Sunday',
    genres: ['History', 'Children’s', 'Science Fiction', 'Travel'],
    publicationDate: '6/7/1977',
    publisher: 'Brainlounge',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '980118441-8',
    language: 'Irish Gaelic',
    pageCount: 872,
    price: 81.37,
    format: ['Hardcover'],
    authorId: '7a71d1b2-5ff1-4b47-a861-9c4089c6b768'
  },
  {
    _id: '69059f04-cd58-45ff-8770-638716b6ddc8',
    title: 'Bad Girl Island (Sirens of Eleuthera) (Sirens of the Caribbean)',
    genres: ['Romance'],
    publicationDate: '10/8/2002',
    publisher: 'Realcube',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '000028945-0',
    language: 'Chinese',
    pageCount: 675,
    price: 45.39,
    format: ['E-Book', 'Paperback'],
    authorId: '8292872d-dad4-490c-ba30-7459f647d2ba'
  },
  {
    _id: '316aaae9-c465-45e9-98c8-712f729770ab',
    title: 'Grapes of Death, The (Raisins de la mort, Les)',
    genres: [
      'Contemporary',
      'Art',
      'Historical fiction',
      'Cookbook',
      'Thriller'
    ],
    publicationDate: '12/27/1966',
    publisher: 'Dynava',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '708089657-6',
    language: 'Guaraní',
    pageCount: 2,
    price: 60.43,
    format: ['Paperback', 'E-Book'],
    authorId: '70d3d49a-99d9-448d-bbe9-451b958dbea9'
  },
  {
    _id: 'da45609d-4e7f-469b-8a61-317d80bb7291',
    title: 'SpaceCamp',
    genres: [
      'Motivational',
      'Art',
      'Personal Development',
      'Science Fiction',
      'Health'
    ],
    publicationDate: '9/16/1927',
    publisher: 'Kare',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    isbn: '169855848-1',
    language: 'Dutch',
    pageCount: 466,
    price: 7.94,
    format: ['Paperback'],
    authorId: '2579080f-eb74-4ed3-8167-2e376841407c'
  },
  {
    _id: '5006afb2-f7cb-4ef4-8bf1-3e36b3347da4',
    title: "Aujourd'hui",
    genres: ['Motivational', 'Romance', 'Mystery', 'Humor', 'Horror'],
    publicationDate: '10/4/1958',
    publisher: 'Skimia',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '366350807-2',
    language: 'Nepali',
    pageCount: 95,
    price: 86.47,
    format: ['Hardcover', 'E-Book'],
    authorId: '64eb6b8c-309a-4b79-947f-d1e58a4a5a69'
  },
  {
    _id: 'f757d5eb-f36a-4b73-8de8-a0431ae03815',
    title: 'Fluffer, The',
    genres: [
      'Motivational',
      'Bildungsroman',
      'Families & Relationships',
      'Horror',
      'Health'
    ],
    publicationDate: '1/10/1976',
    publisher: 'Yombu',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '850842593-7',
    language: 'Korean',
    pageCount: 147,
    price: 68.67,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '81c74c34-9bc4-4f0e-bd73-6138cf29b38d'
  },
  {
    _id: 'd39658e0-9c1b-4ee5-9ca1-93840a0ffa7f',
    title: 'Virginia',
    genres: [
      'Horror',
      'Cookbook',
      'Dystopian',
      'Personal Development',
      'Health'
    ],
    publicationDate: '4/12/1925',
    publisher: 'Devpulse',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '844975225-6',
    language: 'Georgian',
    pageCount: 812,
    price: 19.17,
    format: ['Paperback', 'Hardcover'],
    authorId: '19744cae-ce5c-4c33-94bf-3882aee39f5f'
  },
  {
    _id: '8f5c355e-377d-466a-96f7-da0be9ccab30',
    title: "Man of My Life, The (L'homme de sa vie)",
    genres: ['Memoir', 'Southern Gothic Fiction', 'Health'],
    publicationDate: '2/23/1999',
    publisher: 'Riffpath',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '602466492-3',
    language: 'Māori',
    pageCount: 211,
    price: 50.51,
    format: ['E-Book', 'Hardcover'],
    authorId: '96d8604e-0e99-4bd1-bcc6-1a0800b317c2'
  },
  {
    _id: 'b3c3c778-21f1-40ac-9bba-4480fbec597e',
    title: 'League of Gentlemen, The',
    genres: [
      'Memoir',
      'Gothic',
      'Families & Relationships',
      'Health',
      'Thriller'
    ],
    publicationDate: '3/21/2023',
    publisher: 'Jabbersphere',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '677979316-7',
    language: 'German',
    pageCount: 676,
    price: 27.92,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'ba651cf2-8c94-459f-96f6-6a44aa62eb6f'
  },
  {
    _id: 'e2cce5d2-a19c-4c4a-ac13-c2f8f855691c',
    title: 'Oz the Great and Powerful',
    genres: ['Southern Gothic Fiction', 'Bildungsroman', 'Fiction'],
    publicationDate: '9/1/1934',
    publisher: 'Roodel',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '774526581-9',
    language: 'Malagasy',
    pageCount: 384,
    price: 93.68,
    format: ['E-Book', 'Hardcover'],
    authorId: 'cc50469f-6265-44ba-99be-2e27b4b60a4b'
  },
  {
    _id: '3c44bd58-128b-4abe-8983-285cc90c25d5',
    title: 'Time Stood Still (Il tempo si è fermato)',
    genres: ['Travel', 'Self-help', 'Guide / How-to', 'Memoir'],
    publicationDate: '5/22/1948',
    publisher: 'Riffpath',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '297091682-7',
    language: 'Tswana',
    pageCount: 425,
    price: 53.14,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'b747c2cc-e527-405e-b8a1-ee8c823be501'
  },
  {
    _id: '4953e326-0f1a-4911-ab0d-e546f4cf6445',
    title: 'Perfect Host, The',
    genres: ['Paranormal'],
    publicationDate: '7/13/2017',
    publisher: 'Dynabox',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '816667835-7',
    language: 'Afrikaans',
    pageCount: 716,
    price: 86.01,
    format: ['E-Book', 'Hardcover'],
    authorId: 'cc37f78d-b034-4e43-8add-42055c477612'
  },
  {
    _id: 'a6c7c1c2-fb1c-45c9-9c0d-24de5c19d209',
    title: 'Gorgeous Hussy, The',
    genres: ['Adventure', 'Humor', 'Art'],
    publicationDate: '12/24/1996',
    publisher: 'Yamia',
    summary:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    isbn: '347586364-2',
    language: 'Greek',
    pageCount: 390,
    price: 96.36,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '0b5c7c70-f14f-4ee2-ab72-bcfc0281c97f'
  },
  {
    _id: '418afaae-891f-4b7d-8ad3-e70bee5b001c',
    title: 'Clearing, The',
    genres: ['Fiction'],
    publicationDate: '10/23/1918',
    publisher: 'Demimbu',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '628034664-1',
    language: 'Tok Pisin',
    pageCount: 272,
    price: 40.86,
    format: ['Paperback'],
    authorId: '948fa67c-57bd-48a9-8cd6-9d4ec32155ec'
  },
  {
    _id: 'fc09a0e5-84d1-412c-854f-3da02ee839fc',
    title: 'Steamboat Bill, Jr.',
    genres: ['Bildungsroman', 'Paranormal', 'Guide / How-to'],
    publicationDate: '12/25/1903',
    publisher: 'Skimia',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '866109557-3',
    language: 'Dhivehi',
    pageCount: 478,
    price: 68.47,
    format: ['Paperback', 'Hardcover'],
    authorId: 'a122a3ba-36c2-48d1-9014-83cd41e17953'
  },
  {
    _id: '6134f0ca-001c-4a0a-b2a7-4fdc2bc363a9',
    title: 'Teenage Caveman',
    genres: ['Mystery', 'Self-help', 'Gothic', 'Thriller'],
    publicationDate: '5/4/1908',
    publisher: 'Linklinks',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '391165144-9',
    language: 'Fijian',
    pageCount: 500,
    price: 16.01,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'b5f4b1de-bf43-4106-840b-bd0dd7e5ff37'
  },
  {
    _id: 'ae036cbd-0a2b-4804-a63f-b3e67a01e1d2',
    title: 'Fiddle-de-dee',
    genres: [
      'Bildungsroman',
      'Southern Gothic Fiction',
      'Horror',
      'Paranormal',
      'Contemporary'
    ],
    publicationDate: '4/4/1991',
    publisher: 'Twitterworks',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '509202357-0',
    language: 'Kyrgyz',
    pageCount: 660,
    price: 71.51,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'dcc3ecde-e73e-438f-8753-64a6508b9f90'
  },
  {
    _id: 'ee7a3b0c-ce51-4dff-b713-48999e39ae17',
    title: 'Big Bad Mama',
    genres: ['Personal Development', 'Horror'],
    publicationDate: '3/28/1999',
    publisher: 'Gigabox',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '757893811-8',
    language: 'Tamil',
    pageCount: 727,
    price: 68.73,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'a0b45428-5eee-42cf-bc8f-bd978c7b516d'
  },
  {
    _id: '337d7071-e19d-474d-99d1-401961072b8a',
    title: 'Capture of Bigfoot, The',
    genres: ['Historical fiction'],
    publicationDate: '9/8/1997',
    publisher: 'Buzzshare',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '031500192-5',
    language: 'Gagauz',
    pageCount: 329,
    price: 85.7,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: 'ab02e951-4cf9-4b1c-89fd-752079f39ef3'
  },
  {
    _id: '9ad146be-a5ec-459a-9d3c-1e8b6091804e',
    title: 'Die, Mommie, Die',
    genres: ['Romance', 'Memoir', 'Mystery'],
    publicationDate: '10/10/1955',
    publisher: 'Flashpoint',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '396720896-6',
    language: 'English',
    pageCount: 786,
    price: 44.4,
    format: ['E-Book'],
    authorId: '0a271c3c-9919-4c8a-8261-c9f7336695bd'
  },
  {
    _id: '3988e747-e5c7-496d-a634-70b80d48b961',
    title: 'Captains of the Clouds',
    genres: ['Art', 'Mystery', 'Memoir', 'Fiction', 'Science Fiction'],
    publicationDate: '2/11/1902',
    publisher: 'Devshare',
    summary:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '057407563-1',
    language: 'Thai',
    pageCount: 9,
    price: 28.28,
    format: ['E-Book', 'Paperback'],
    authorId: 'dacb27a3-b968-4806-b801-d2342c6e964b'
  },
  {
    _id: '6c420bb9-c9ee-4bd9-ac21-ff970ec42cf3',
    title: 'The Fuller Brush Man',
    genres: ['Gothic'],
    publicationDate: '12/3/2005',
    publisher: 'Gabtune',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '793858497-5',
    language: 'Croatian',
    pageCount: 841,
    price: 70.58,
    format: ['Hardcover', 'E-Book'],
    authorId: '7e5ac46a-3b7e-480f-a394-26aa9b8fc722'
  },
  {
    _id: 'cc05066c-5e11-4667-a819-b33117770957',
    title: 'Violent Saturday',
    genres: ['Humor'],
    publicationDate: '6/27/2002',
    publisher: 'Bluezoom',
    summary:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    isbn: '759850632-9',
    language: 'Tok Pisin',
    pageCount: 747,
    price: 61.42,
    format: ['Hardcover'],
    authorId: '23896b07-323f-4865-99fb-cb2f5ee11881'
  },
  {
    _id: '0a6935a0-ba82-4016-986e-82c15d4b1192',
    title: 'Sea, The (Hafið)',
    genres: ['Fiction', 'Science Fiction', 'Health'],
    publicationDate: '1/1/1925',
    publisher: 'Einti',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '937383671-4',
    language: 'Sotho',
    pageCount: 95,
    price: 69.58,
    format: ['Hardcover'],
    authorId: '44146811-c29c-44a3-a186-010f7b5d9376'
  },
  {
    _id: '5bf0f3af-07b3-47ab-b0c7-67616437cc7f',
    title: 'Secret Admirer',
    genres: ['Mystery', 'Gothic'],
    publicationDate: '11/3/1931',
    publisher: 'Tagpad',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '911873117-1',
    language: 'Thai',
    pageCount: 917,
    price: 66.88,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '11d8a604-6039-4287-ad62-4a1359cb9929'
  },
  {
    _id: '5298bbae-e3bb-4f57-9fab-4ff75f1a58a1',
    title: 'Bird of Paradise',
    genres: ['Children’s', 'Historical fiction'],
    publicationDate: '10/2/1998',
    publisher: 'Thoughtbridge',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '706535438-5',
    language: 'Bengali',
    pageCount: 969,
    price: 79.86,
    format: ['E-Book', 'Hardcover'],
    authorId: '41f61915-3942-4d1b-9a8d-6b4d6f31def3'
  },
  {
    _id: 'd0a26754-30dc-491d-a765-e3200598596b',
    title: 'Dom Hemingway',
    genres: ['Guide / How-to', 'Art', 'History'],
    publicationDate: '6/15/1920',
    publisher: 'Tagcat',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '693548622-X',
    language: 'Fijian',
    pageCount: 683,
    price: 84.82,
    format: ['Paperback', 'Hardcover'],
    authorId: '29309feb-4a7a-4e55-88d2-747df6f763c5'
  },
  {
    _id: 'c3171477-4608-4357-aa5b-d507cd67c2ef',
    title: 'Bluebeard (Barbe-Bleue)',
    genres: ['Mystery', 'Romance', 'Bildungsroman'],
    publicationDate: '9/14/1936',
    publisher: 'Pixope',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '760745551-5',
    language: 'Persian',
    pageCount: 997,
    price: 18.61,
    format: ['Paperback', 'E-Book'],
    authorId: 'ca226c81-0ae2-40ba-9a58-57282bc2f6af'
  },
  {
    _id: '9a8b817b-af91-44bc-b7b6-8f38129fe497',
    title: 'Pig Hunt ',
    genres: ['Gothic', 'Cookbook', 'Self-help'],
    publicationDate: '6/30/1986',
    publisher: 'Camimbo',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '017229450-9',
    language: 'French',
    pageCount: 762,
    price: 90.13,
    format: ['Paperback', 'E-Book'],
    authorId: 'def768fc-5cdb-4222-acb5-b14ce8f4083f'
  },
  {
    _id: '88b7acd1-e7a5-475a-8c5f-0ec93d67ec62',
    title: 'Out Cold',
    genres: ['History', 'Cookbook', 'Southern Gothic Fiction', 'Children’s'],
    publicationDate: '10/4/2010',
    publisher: 'Wordpedia',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '797349438-3',
    language: 'Arabic',
    pageCount: 244,
    price: 94.92,
    format: ['Hardcover', 'Paperback'],
    authorId: 'b76505c2-9510-4e62-bdb6-db2a2906059b'
  },
  {
    _id: '55819fc3-50e6-4f8a-97c9-fd4c7ad5ec09',
    title: 'Stanley Kubrick: A Life in Pictures',
    genres: ['Mystery', 'Cookbook', 'Horror', 'Bildungsroman'],
    publicationDate: '8/21/1903',
    publisher: 'Buzzster',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '067337638-9',
    language: 'Kannada',
    pageCount: 8,
    price: 22.22,
    format: ['Paperback', 'Hardcover'],
    authorId: '8baedb8e-4a69-4f01-82b3-0b4374d74ad4'
  },
  {
    _id: '2462d3aa-f532-4a44-b8e6-abb628b080c5',
    title: 'Underworld',
    genres: [
      'Guide / How-to',
      'Bildungsroman',
      'Memoir',
      'Horror',
      'Children’s'
    ],
    publicationDate: '10/7/2008',
    publisher: 'Trudeo',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '895525654-X',
    language: 'Kashmiri',
    pageCount: 104,
    price: 71.2,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'f3159d8b-d89b-4741-a77f-ea80b0998491'
  },
  {
    _id: 'b5c585ef-31d2-41b8-b94a-aed0f92807d4',
    title: 'Wind Chill',
    genres: ['Contemporary', 'Personal Development', 'Children’s'],
    publicationDate: '7/2/1979',
    publisher: 'Bubblemix',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '907885424-3',
    language: 'Azeri',
    pageCount: 980,
    price: 56.53,
    format: ['E-Book', 'Hardcover'],
    authorId: 'eb541d9a-16ea-47f9-ae36-1ba6bcfa7494'
  },
  {
    _id: '53041540-97b8-44d9-b65f-43ea8f061fac',
    title: 'The Kingdom of Dreams and Madness',
    genres: [
      'Motivational',
      'Memoir',
      'Children’s',
      'Southern Gothic Fiction',
      'Humor'
    ],
    publicationDate: '10/11/2003',
    publisher: 'Bubblebox',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '512411763-X',
    language: 'Gagauz',
    pageCount: 216,
    price: 72.4,
    format: ['Paperback', 'E-Book'],
    authorId: '76ade80d-1b0e-49ef-8e20-a1d2b193bb06'
  },
  {
    _id: 'dd1f2723-95d3-4533-ae22-b7515911ad4c',
    title: 'The Forbidden Room',
    genres: [
      'Gothic',
      'Contemporary',
      'Guide / How-to',
      'Horror',
      'Families & Relationships'
    ],
    publicationDate: '10/19/2022',
    publisher: 'Feedmix',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '870155746-7',
    language: 'Lithuanian',
    pageCount: 436,
    price: 13.78,
    format: ['Hardcover', 'Paperback', 'E-Book'],
    authorId: '66a2d10a-f895-4e93-9eb6-3abfa87bc211'
  },
  {
    _id: '56dd5e55-1146-42ef-8553-2a2fe535aa22',
    title: 'Future by Design',
    genres: [
      'Families & Relationships',
      'Motivational',
      'Fiction',
      'Humor',
      'Contemporary'
    ],
    publicationDate: '3/16/1918',
    publisher: 'Skajo',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '019701257-4',
    language: 'Lao',
    pageCount: 787,
    price: 84.89,
    format: ['Hardcover', 'E-Book'],
    authorId: 'a0b45428-5eee-42cf-bc8f-bd978c7b516d'
  },
  {
    _id: '7eb2f97c-861b-46ac-9a88-c0c42aee0dd1',
    title: 'V: The Final Battle',
    genres: ['Health'],
    publicationDate: '5/14/1993',
    publisher: 'Abata',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '054244784-3',
    language: 'Guaraní',
    pageCount: 606,
    price: 96.94,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '4208ab06-9757-4906-bad9-55a94a01072e'
  },
  {
    _id: '12d089ab-f6d5-4a8a-8233-32826fde5468',
    title: 'Passion of Mind',
    genres: ['Fiction', 'Art', 'Personal Development'],
    publicationDate: '7/6/2018',
    publisher: 'Devpoint',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '592182460-7',
    language: 'Ndebele',
    pageCount: 552,
    price: 27.76,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '3d5cddce-4406-4073-9164-07910750ab76'
  },
  {
    _id: 'dd0523fa-520b-4e26-930b-4f90e288aa2b',
    title: 'Space Raiders',
    genres: ['Thriller', 'Southern Gothic Fiction', 'Families & Relationships'],
    publicationDate: '9/18/1979',
    publisher: 'Jabbertype',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '923121065-3',
    language: 'Quechua',
    pageCount: 382,
    price: 72.69,
    format: ['Hardcover', 'Paperback'],
    authorId: '4de7f77b-dad4-4c05-af13-24f2b1dd4914'
  },
  {
    _id: '8bfee834-dd66-439a-9c80-3f0863f97d02',
    title: 'Underclassman',
    genres: ['Science Fiction', 'Travel', 'Self-help', 'Romance'],
    publicationDate: '12/27/1936',
    publisher: 'Zoomcast',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '753983376-9',
    language: 'Yiddish',
    pageCount: 867,
    price: 90.25,
    format: ['E-Book', 'Paperback'],
    authorId: '051a48a8-f65f-465a-bb09-53ec58b4ef43'
  },
  {
    _id: 'fedeef51-60c7-4b41-b6ca-4f069eeb72e3',
    title: 'Magnificent Yankee, The',
    genres: ['Motivational', 'History', 'Adventure'],
    publicationDate: '8/12/1955',
    publisher: 'Einti',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '063975431-7',
    language: 'Bulgarian',
    pageCount: 710,
    price: 30.85,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'c9dd26e0-d10a-41fe-b54e-1f50cc288915'
  },
  {
    _id: 'a7f4dc6c-af66-41e1-83f4-cec16e87fc75',
    title: 'Promises',
    genres: ['Self-help', 'Contemporary', 'Gothic'],
    publicationDate: '7/8/2015',
    publisher: 'Babbleset',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '672129892-9',
    language: 'Punjabi',
    pageCount: 320,
    price: 46.05,
    format: ['Hardcover', 'E-Book'],
    authorId: 'd9ea6a95-9ea8-4d70-89cc-8abc389aaa80'
  },
  {
    _id: '705b19b8-75d3-4c60-9fa7-c140dc8c6885',
    title: 'Tuulikaappimaa',
    genres: ['Science Fiction', 'Adventure'],
    publicationDate: '4/8/1977',
    publisher: 'Flashspan',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '853369702-3',
    language: 'Hiri Motu',
    pageCount: 148,
    price: 66.77,
    format: ['Hardcover', 'Paperback'],
    authorId: '0c802ad2-5013-4589-8267-034d195a88fe'
  },
  {
    _id: 'd2eee20c-14dd-4f9c-af10-afdd17473b29',
    title: 'Christmas Carol: The Movie',
    genres: ['Children’s', 'History', 'Paranormal', 'Thriller'],
    publicationDate: '1/21/1947',
    publisher: 'Meevee',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    isbn: '637780858-5',
    language: 'Bulgarian',
    pageCount: 989,
    price: 64.02,
    format: ['E-Book'],
    authorId: '6dd60757-b807-4923-996a-6b493bc20b4e'
  },
  {
    _id: '7e31fa45-7d8e-4c94-85a2-f25b54a82134',
    title: 'W.',
    genres: ['Children’s', 'Science Fiction', 'Mystery'],
    publicationDate: '10/27/1998',
    publisher: 'Browsedrive',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '155878837-9',
    language: 'Haitian Creole',
    pageCount: 434,
    price: 80.9,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: '21781c41-f8c7-41c7-9892-d5e2fb698458'
  },
  {
    _id: 'cdb74424-6d56-44b3-bd54-c983722d8d8a',
    title: 'Things to Come',
    genres: ['Humor'],
    publicationDate: '10/22/1968',
    publisher: 'Livefish',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '201594125-8',
    language: 'Hungarian',
    pageCount: 278,
    price: 2.75,
    format: ['Paperback'],
    authorId: '963cf4e5-5093-404c-bab8-92a74a1a9ba6'
  },
  {
    _id: 'e1fd955f-a913-4a99-bf47-113d0a0b494c',
    title: "Lady Windermere's Fan",
    genres: ['Southern Gothic Fiction'],
    publicationDate: '6/27/1990',
    publisher: 'Skyble',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '270014035-4',
    language: 'Italian',
    pageCount: 221,
    price: 58.89,
    format: ['Paperback', 'E-Book'],
    authorId: '0cd81324-d1c0-4a3a-babb-3277f36c7019'
  },
  {
    _id: '2989c7ba-2a17-404d-ba83-c15ad2cde988',
    title: 'Mother, I Love You',
    genres: ['Families & Relationships', 'Adventure', 'Art'],
    publicationDate: '6/3/2012',
    publisher: 'Oyoloo',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '226812167-4',
    language: 'Luxembourgish',
    pageCount: 65,
    price: 96.49,
    format: ['Paperback'],
    authorId: 'dca95873-95d1-4b6f-a3ec-18a2e3c72f6c'
  },
  {
    _id: 'd9546cf2-1584-4309-a83d-2c9d7bc53533',
    title: 'Over the Brooklyn Bridge',
    genres: ['Mystery', 'Families & Relationships', 'Paranormal'],
    publicationDate: '1/29/2010',
    publisher: 'Twitterwire',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '081613608-4',
    language: 'Dzongkha',
    pageCount: 762,
    price: 87.92,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '0b5c7c70-f14f-4ee2-ab72-bcfc0281c97f'
  },
  {
    _id: 'b0b778f6-9deb-4d48-9b44-2fd8b0ca6b46',
    title: 'Stray Dogs (Sag-haye velgard)',
    genres: ['Cookbook', 'Adventure', 'History'],
    publicationDate: '2/28/2018',
    publisher: 'Feedfish',
    summary:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    isbn: '470319768-5',
    language: 'Hiri Motu',
    pageCount: 736,
    price: 41.24,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: 'fd3164ab-cc21-4d6c-89aa-96148c5df31a'
  },
  {
    _id: 'cc0a61e2-770e-44a9-8fe7-bd81fb609aa4',
    title: 'Home Alone 2: Lost in New York',
    genres: ['Personal Development'],
    publicationDate: '4/23/1917',
    publisher: 'Chatterbridge',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '699919357-6',
    language: 'Azeri',
    pageCount: 507,
    price: 63.08,
    format: ['Paperback', 'Hardcover'],
    authorId: 'ff133d67-f674-493c-a301-55914ac411e2'
  },
  {
    _id: '7e3b4c92-13be-40f5-95bb-5ecf09ad1e29',
    title: 'Mr. Magoo',
    genres: ['Mystery', 'Travel', 'Personal Development'],
    publicationDate: '3/1/1904',
    publisher: 'Fiveclub',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    isbn: '836226916-2',
    language: 'Bosnian',
    pageCount: 920,
    price: 76.84,
    format: ['Paperback', 'E-Book'],
    authorId: 'f36cd039-12da-4747-9bb8-ec8666fe62f3'
  },
  {
    _id: '91c1a0d5-4a5f-4308-947c-57e771c7e3af',
    title: 'Phat Beach',
    genres: ['Children’s', 'Dystopian', 'Southern Gothic Fiction'],
    publicationDate: '4/24/1988',
    publisher: 'Zoonder',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '453808882-X',
    language: 'Papiamento',
    pageCount: 464,
    price: 60.88,
    format: ['Paperback', 'E-Book'],
    authorId: '9b9e7564-d1d5-4c40-a040-5ae6e72a54b0'
  },
  {
    _id: 'b2c44577-995b-466d-a4f2-0812ac0183ed',
    title: 'Unholy Three, The',
    genres: ['Travel', 'Fiction', 'Adventure'],
    publicationDate: '10/13/1900',
    publisher: 'Fadeo',
    summary:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    isbn: '708303771-X',
    language: 'Montenegrin',
    pageCount: 270,
    price: 17.75,
    format: ['Hardcover'],
    authorId: '3dad07d6-9ca7-498e-a4b7-f9565dd54367'
  },
  {
    _id: '26777279-92e1-475d-a75a-a1b2365ff83a',
    title: 'So Much So Fast',
    genres: ['Gothic', 'Science Fiction', 'Motivational', 'Art', 'Health'],
    publicationDate: '2/4/2008',
    publisher: 'Quinu',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '646705552-7',
    language: 'Dari',
    pageCount: 973,
    price: 14.88,
    format: ['Paperback', 'Hardcover'],
    authorId: '8413647c-8144-4ccf-bf74-6d217a383d8b'
  },
  {
    _id: '0c358a93-dc57-49aa-ac8c-a3b3fde195e3',
    title: 'Summer Magic',
    genres: ['Bildungsroman'],
    publicationDate: '3/28/1907',
    publisher: 'Eabox',
    summary:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '442216405-8',
    language: 'Guaraní',
    pageCount: 641,
    price: 23.76,
    format: ['Hardcover'],
    authorId: '569d368d-46ef-43d9-aada-b17e655a509f'
  },
  {
    _id: '55e77070-9fb6-4c63-ab5f-5b44b472ed01',
    title: 'Exorcist, The',
    genres: ['Paranormal', 'Adventure'],
    publicationDate: '12/27/1926',
    publisher: 'Jatri',
    summary:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    isbn: '055940301-1',
    language: 'Hindi',
    pageCount: 761,
    price: 5.19,
    format: ['Paperback', 'E-Book'],
    authorId: '70d3d49a-99d9-448d-bbe9-451b958dbea9'
  },
  {
    _id: '5fbbda70-61ba-4e8e-9d7b-45bc2b087827',
    title: 'Cider House Rules, The',
    genres: ['Self-help', 'Horror', 'Historical fiction'],
    publicationDate: '6/26/1926',
    publisher: 'Teklist',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '899219619-9',
    language: 'Portuguese',
    pageCount: 369,
    price: 33.79,
    format: ['Paperback', 'E-Book'],
    authorId: 'a62686d4-f556-42ca-9ad7-8443e1a8d285'
  },
  {
    _id: '87911e99-24a1-4efc-b6ca-0b03e34ecb89',
    title: 'Catch Me If You Can',
    genres: ['Horror', 'Gothic'],
    publicationDate: '9/9/1960',
    publisher: 'Thoughtsphere',
    summary:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    isbn: '552643101-0',
    language: 'Yiddish',
    pageCount: 349,
    price: 99.23,
    format: ['Hardcover', 'Paperback'],
    authorId: '1b6f0c27-ab49-4783-a19a-9a8ab718292b'
  },
  {
    _id: '5e36e4d2-8d5c-44c6-bf94-d3386e2d6eb0',
    title: 'Bhutto',
    genres: ['Horror'],
    publicationDate: '4/27/2002',
    publisher: 'Vinder',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    isbn: '615371912-0',
    language: 'Czech',
    pageCount: 118,
    price: 86.28,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '57c2adb0-f534-4cf2-adf6-8350632fb271'
  },
  {
    _id: 'd12753cf-fdff-41e5-ba84-603bb21ef488',
    title: 'Garden Party',
    genres: [
      'Contemporary',
      'Families & Relationships',
      'Science Fiction',
      'Dystopian',
      'Motivational'
    ],
    publicationDate: '4/13/1984',
    publisher: 'Realfire',
    summary:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    isbn: '088786999-8',
    language: 'Croatian',
    pageCount: 412,
    price: 72.37,
    format: ['E-Book'],
    authorId: 'a4bb2a05-b8a2-4476-9d0a-32f49cabd137'
  },
  {
    _id: 'c8628b06-4fbf-4437-af28-f6eb5ac058a4',
    title: 'Bad Day on the Block',
    genres: ['Guide / How-to', 'Bildungsroman', 'History', 'Mystery'],
    publicationDate: '5/5/1921',
    publisher: 'Tekfly',
    summary:
      'Maecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    isbn: '383728602-9',
    language: 'New Zealand Sign Language',
    pageCount: 794,
    price: 74.42,
    format: ['Hardcover', 'Paperback'],
    authorId: 'd6caf59c-f74c-415a-a5c7-d80ecafd1c0b'
  },
  {
    _id: '18bf65c5-da0f-4f73-91a4-c5787c984d7b',
    title: 'Acts of Worship ',
    genres: [
      'Self-help',
      'Thriller',
      'Romance',
      'Gothic',
      'Historical fiction'
    ],
    publicationDate: '12/18/1957',
    publisher: 'Jatri',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '745183631-2',
    language: 'French',
    pageCount: 936,
    price: 20.62,
    format: ['Hardcover', 'E-Book'],
    authorId: '08ea4126-55c9-4669-af5a-3ec5df08d0ca'
  },
  {
    _id: 'eabba912-e81e-4326-989f-6f627db203cd',
    title: 'Bush Mama',
    genres: [
      'Thriller',
      'Children’s',
      'Motivational',
      'Personal Development',
      'Science Fiction'
    ],
    publicationDate: '10/16/2016',
    publisher: 'Janyx',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '918320631-0',
    language: 'Guaraní',
    pageCount: 279,
    price: 41.16,
    format: ['E-Book', 'Paperback'],
    authorId: 'eea94c31-9e82-4c6a-949f-77aedca936e0'
  },
  {
    _id: '4fe311d7-b1a4-4adb-b7a5-9920ec571997',
    title: 'Carancho',
    genres: ['Paranormal', 'Art'],
    publicationDate: '6/5/1990',
    publisher: 'Pixope',
    summary:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus _id, turpis. Integer aliquet, massa _id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    isbn: '836127449-9',
    language: 'Irish Gaelic',
    pageCount: 945,
    price: 88.91,
    format: ['E-Book'],
    authorId: '0a606ad7-03a3-4326-aaab-fa1a2dd399af'
  },
  {
    _id: '7f52d448-0b74-4a7e-bcf5-d3ce9863a244',
    title: 'Night Nurse',
    genres: [
      'Adventure',
      'Gothic',
      'Thriller',
      'Families & Relationships',
      'Science Fiction'
    ],
    publicationDate: '2/4/1956',
    publisher: 'Rhynoodle',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '214935843-3',
    language: 'Guaraní',
    pageCount: 683,
    price: 39.75,
    format: ['Hardcover'],
    authorId: 'e2f25558-3670-4245-a14c-96411334340c'
  },
  {
    _id: '0e1c04cd-54a1-4b77-b70f-617a871f9b05',
    title: 'Surviving Desire',
    genres: ['Mystery', 'Bildungsroman', 'Dystopian', 'Health'],
    publicationDate: '11/4/1910',
    publisher: 'Edgepulse',
    summary:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '581843789-2',
    language: 'Norwegian',
    pageCount: 505,
    price: 23.09,
    format: ['Paperback', 'E-Book'],
    authorId: 'a0e45f04-ca38-4d40-b5ed-d951d3c82712'
  },
  {
    _id: '705ed494-6e03-44fb-995f-0fcc4737b0cd',
    title: 'Royal Scandal, The',
    genres: [
      'Personal Development',
      'Families & Relationships',
      'Bildungsroman',
      'Travel'
    ],
    publicationDate: '4/21/1907',
    publisher: 'Buzzdog',
    summary:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    isbn: '974331194-7',
    language: 'Bosnian',
    pageCount: 801,
    price: 24.98,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '9ecc533b-d3bd-4812-8f64-12c7cc1404b1'
  },
  {
    _id: '8beaa0c5-bd83-452a-a984-836eb3839b37',
    title: 'Neverland',
    genres: ['Southern Gothic Fiction'],
    publicationDate: '1/20/2016',
    publisher: 'Brainbox',
    summary:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '140791152-X',
    language: 'Luxembourgish',
    pageCount: 648,
    price: 55.2,
    format: ['Paperback'],
    authorId: '3e0a8487-426a-4866-85bc-33db5cad2ad0'
  },
  {
    _id: 'edfb90d3-a4ee-49fe-b3a3-e41671965f5d',
    title: "Witches' Hammer (Kladivo na carodejnice) ",
    genres: ['Horror', 'Children’s'],
    publicationDate: '5/7/1907',
    publisher: 'Wordify',
    summary:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '881798083-8',
    language: 'Kyrgyz',
    pageCount: 393,
    price: 98.84,
    format: ['Paperback', 'E-Book'],
    authorId: '59d00508-ed3b-44ec-ab33-6629eff4c5ae'
  },
  {
    _id: 'c720a847-6716-4b0d-9e59-77e26a4fc45e',
    title: 'Children of the Corn III',
    genres: ['Self-help', 'History'],
    publicationDate: '8/10/1967',
    publisher: 'Skipfire',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    isbn: '375280715-6',
    language: 'Portuguese',
    pageCount: 440,
    price: 85.82,
    format: ['Hardcover'],
    authorId: 'e2f25558-3670-4245-a14c-96411334340c'
  },
  {
    _id: '8ef1c996-5bcc-4565-ae03-ae0df4de5b01',
    title: 'B*A*P*S',
    genres: [
      'Southern Gothic Fiction',
      'Children’s',
      'Horror',
      'Science Fiction',
      'Self-help'
    ],
    publicationDate: '7/28/1955',
    publisher: 'Topdrive',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '812215204-X',
    language: 'Dhivehi',
    pageCount: 677,
    price: 93.57,
    format: ['Paperback', 'E-Book'],
    authorId: '0771dc5a-d9bc-4fe1-a488-b5c68a136c39'
  },
  {
    _id: 'fb2d3d4e-659f-437c-8dbd-0153a85109b8',
    title: 'My Afternoons with Margueritte (La tête en friche)',
    genres: ['Thriller', 'Fiction', 'Gothic', 'Guide / How-to'],
    publicationDate: '6/16/1901',
    publisher: 'Minyx',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '344516673-0',
    language: 'Yiddish',
    pageCount: 192,
    price: 26.81,
    format: ['Paperback'],
    authorId: 'c6ba9f0c-e9e6-4190-a834-115f10349196'
  },
  {
    _id: '8eadf719-599a-4fee-8d30-9eaaddc39537',
    title: 'Sybil',
    genres: [
      'Humor',
      'Thriller',
      'Dystopian',
      'Contemporary',
      'Historical fiction'
    ],
    publicationDate: '1/17/1962',
    publisher: 'Jetwire',
    summary:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    isbn: '969167182-4',
    language: 'Polish',
    pageCount: 377,
    price: 36.84,
    format: ['E-Book', 'Paperback'],
    authorId: '948987d5-13ce-4725-988b-105c05ece819'
  },
  {
    _id: 'b59f3409-7872-4912-b33c-40564843ec18',
    title: 'The War at Home',
    genres: [
      'Paranormal',
      'Families & Relationships',
      'Southern Gothic Fiction'
    ],
    publicationDate: '1/20/1959',
    publisher: 'Edgeify',
    summary:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '911551368-8',
    language: 'Greek',
    pageCount: 573,
    price: 74.72,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'ef5783eb-eec4-4f35-af6d-4c3bfcc036ff'
  },
  {
    _id: '33bffc52-855f-4389-9158-2c185c5c2999',
    title: 'Olive Kitteridge',
    genres: [
      'Southern Gothic Fiction',
      'Science Fiction',
      'Gothic',
      'Historical fiction',
      'Adventure'
    ],
    publicationDate: '6/11/1966',
    publisher: 'Photofeed',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.',
    isbn: '780276271-5',
    language: 'Guaraní',
    pageCount: 720,
    price: 40.25,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '789c581a-3e2c-4880-ba97-a739ac4ed841'
  },
  {
    _id: '25117e27-bce6-42ad-9ecd-f05be93342b0',
    title: 'Caramel (Sukkar banat)',
    genres: ['Southern Gothic Fiction', 'Bildungsroman'],
    publicationDate: '2/19/1985',
    publisher: 'Skibox',
    summary:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '834244437-6',
    language: 'Polish',
    pageCount: 946,
    price: 45.1,
    format: ['Hardcover'],
    authorId: '757e021b-a7e0-40e4-9e4f-3b944433f545'
  },
  {
    _id: 'c1131fa5-4210-4cf2-bf68-e499f5748913',
    title: 'Party, The (Boum, La)',
    genres: [
      'Motivational',
      'Travel',
      'Personal Development',
      'Humor',
      'Cookbook'
    ],
    publicationDate: '5/28/1900',
    publisher: 'Feedspan',
    summary:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '627042953-6',
    language: 'Greek',
    pageCount: 434,
    price: 21.14,
    format: ['E-Book', 'Hardcover', 'Paperback'],
    authorId: 'e6c1ab2a-0a17-4f6b-ae2c-397fc0373c33'
  },
  {
    _id: 'ba3be617-3ff6-4a96-8da1-81396e485e7e',
    title: '11-11-11 (11-11-11: The Prophecy)',
    genres: ['Gothic', 'Romance'],
    publicationDate: '4/6/1907',
    publisher: 'Twitterbeat',
    summary:
      'Quisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    isbn: '679965475-8',
    language: 'Norwegian',
    pageCount: 577,
    price: 86.62,
    format: ['Paperback', 'E-Book'],
    authorId: 'e3cd6df6-103e-4108-bc96-e0d39bd0713f'
  },
  {
    _id: '62310c2f-00d6-41b2-a61f-35f1869a8499',
    title: 'Butley',
    genres: ['Historical fiction', 'Romance'],
    publicationDate: '7/16/1977',
    publisher: 'Photobug',
    summary: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    isbn: '538959375-8',
    language: 'Gujarati',
    pageCount: 653,
    price: 63.27,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '0718844e-fdfb-48a1-a3dd-b1d7cda19c29'
  },
  {
    _id: 'd74c0a0a-a436-4822-b4a8-521ed8c6c451',
    title: "Lilian's Story",
    genres: ['Paranormal'],
    publicationDate: '5/19/1922',
    publisher: 'Skajo',
    summary:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    isbn: '475785175-8',
    language: 'Swahili',
    pageCount: 667,
    price: 62.64,
    format: ['Paperback'],
    authorId: '38efca15-98d3-46b5-9b8d-fa27546c21b6'
  },
  {
    _id: '4974ecba-2b51-45ec-aee3-431dacdb57e9',
    title: 'Park Row',
    genres: ['Gothic'],
    publicationDate: '4/20/1939',
    publisher: 'Livetube',
    summary:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam _id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '567606605-9',
    language: 'Finnish',
    pageCount: 775,
    price: 73.22,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '82d64c87-69d0-4e72-935f-7c06e5368ed5'
  },
  {
    _id: '0d8eb4fc-c3f1-4468-a6b8-30aae5205c00',
    title: 'Moine, Le (Monk, The)',
    genres: ['Guide / How-to', 'Adventure', 'Dystopian'],
    publicationDate: '4/3/1958',
    publisher: 'Yoveo',
    summary:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    isbn: '885324353-8',
    language: 'Māori',
    pageCount: 908,
    price: 4.7,
    format: ['Paperback', 'E-Book'],
    authorId: '4a817c42-ca8c-4be8-8df6-02e99b357a45'
  },
  {
    _id: '5ea781d0-5bee-4623-8a8d-8d85aed1a64e',
    title: 'Something Wicked This Way Comes',
    genres: [
      'Motivational',
      'Health',
      'Historical fiction',
      'Families & Relationships',
      'Cookbook'
    ],
    publicationDate: '12/9/2014',
    publisher: 'Gigabox',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '878499051-1',
    language: 'Belarusian',
    pageCount: 231,
    price: 72.74,
    format: ['E-Book', 'Hardcover'],
    authorId: '23896b07-323f-4865-99fb-cb2f5ee11881'
  },
  {
    _id: '5b2aa72d-6476-4bef-b193-18b5ec94d12e',
    title: 'Man Called Horse, A',
    genres: ['Fiction', 'Paranormal'],
    publicationDate: '7/6/2011',
    publisher: 'Quamba',
    summary:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    isbn: '265083066-2',
    language: 'Telugu',
    pageCount: 840,
    price: 65.33,
    format: ['Paperback'],
    authorId: '954b477c-4d10-42b1-96c9-59dbedbf4c54'
  },
  {
    _id: '0dd20ca1-3754-4d4c-9b3b-152882fbceb4',
    title: 'Malta G.C.',
    genres: ['Thriller', 'Gothic', 'Bildungsroman', 'Fiction'],
    publicationDate: '11/13/1951',
    publisher: 'Buzzdog',
    summary:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    isbn: '737054543-1',
    language: 'Icelandic',
    pageCount: 845,
    price: 29.09,
    format: ['E-Book', 'Paperback'],
    authorId: '33954968-0cf9-49c3-920a-139cc8c5e497'
  },
  {
    _id: '70b1fcf3-869e-49fd-a200-916ff654542a',
    title: 'Hipsters (Stilyagi)',
    genres: ['Thriller', 'History', 'Horror', 'Art'],
    publicationDate: '11/12/2000',
    publisher: 'Mudo',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '978089876-X',
    language: 'Bengali',
    pageCount: 262,
    price: 60.37,
    format: ['E-Book'],
    authorId: '2579080f-eb74-4ed3-8167-2e376841407c'
  },
  {
    _id: 'ff074666-254e-4582-a035-a91102c474c0',
    title: 'Photos in the City of Sylvia (Unas fotos en la ciudad de Sylvia)',
    genres: ['Fiction', 'Memoir', 'Paranormal', 'Self-help', 'Cookbook'],
    publicationDate: '2/25/1959',
    publisher: 'Thoughtbridge',
    summary:
      'Nulla ut erat _id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    isbn: '768321168-0',
    language: 'Afrikaans',
    pageCount: 938,
    price: 19.52,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'b1be653b-93b3-4421-bce7-430d6d97f098'
  },
  {
    _id: 'f9ca9eae-3267-4e6c-8c0b-b65653907d52',
    title:
      'First Day of the Rest of Your Life, The (Le premier jour du reste de ta vie)',
    genres: ['Self-help', 'Art', 'Thriller'],
    publicationDate: '7/13/1949',
    publisher: 'Meetz',
    summary:
      'Proin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    isbn: '379893202-6',
    language: 'Lithuanian',
    pageCount: 34,
    price: 5.47,
    format: ['E-Book', 'Paperback'],
    authorId: '56869ebf-d3b9-4356-95e2-4c3ca80cb191'
  },
  {
    _id: 'c91fbf18-fe6c-4700-b560-cc245b7b44ea',
    title: 'Blue Like Jazz',
    genres: [
      'Southern Gothic Fiction',
      'Gothic',
      'Motivational',
      'Families & Relationships',
      'Humor'
    ],
    publicationDate: '7/25/1913',
    publisher: 'Yoveo',
    summary:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor _id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum _id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    isbn: '813902441-4',
    language: 'Latvian',
    pageCount: 62,
    price: 24.14,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '4ecb2ba5-45ad-4d90-801f-cba7ba5fd095'
  },
  {
    _id: 'a531ccda-6d77-4170-9a6a-aa3eda65fa78',
    title: 'Harold and Kumar Go to White Castle',
    genres: ['Fiction'],
    publicationDate: '7/26/1915',
    publisher: 'Skalith',
    summary:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    isbn: '213790244-3',
    language: 'Pashto',
    pageCount: 597,
    price: 65.33,
    format: ['E-Book', 'Paperback'],
    authorId: '6f4b066f-ca50-4ca9-9dd2-5f8ab9c75550'
  },
  {
    _id: 'dbc85e9f-525d-43bf-bd4e-13f2a581690c',
    title: 'Kundun',
    genres: ['Humor', 'Art'],
    publicationDate: '7/23/2000',
    publisher: 'Quatz',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    isbn: '225975531-3',
    language: 'Greek',
    pageCount: 909,
    price: 94.85,
    format: ['Paperback', 'E-Book'],
    authorId: '519bb91e-e170-46e3-96f6-a363ea30ff1d'
  },
  {
    _id: '622ae74a-9018-42c9-a71f-1759b2f3501e',
    title: 'Out of Life (Hors la vie)',
    genres: ['Historical fiction', 'Mystery', 'Memoir'],
    publicationDate: '10/21/1920',
    publisher: 'Skyba',
    summary:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    isbn: '217340527-6',
    language: 'Arabic',
    pageCount: 123,
    price: 4.57,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: '27025bc3-36b0-4268-a346-e985f74cab78'
  },
  {
    _id: '94a15d18-ec2a-4713-aae6-2a6c2233521f',
    title: 'Tatie Danielle',
    genres: ['Thriller', 'Paranormal', 'Travel', 'Guide / How-to'],
    publicationDate: '6/10/1995',
    publisher: 'Buzzster',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    isbn: '317829398-1',
    language: 'Kannada',
    pageCount: 606,
    price: 20.17,
    format: ['Hardcover', 'Paperback'],
    authorId: '5972400d-aad0-4de3-8230-77dbcfc6020f'
  },
  {
    _id: '340adaf1-5ec4-494c-b5d6-8a5a540b2aba',
    title: 'To Be Twenty',
    genres: [
      'Personal Development',
      'Adventure',
      'Health',
      'Art',
      'Southern Gothic Fiction'
    ],
    publicationDate: '9/15/1912',
    publisher: 'Voonyx',
    summary:
      'Praesent _id massa _id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    isbn: '762430020-6',
    language: 'West Frisian',
    pageCount: 95,
    price: 93.77,
    format: ['Paperback', 'Hardcover'],
    authorId: 'ba5fb3bd-840b-4590-8176-6e1ec29ff1f7'
  },
  {
    _id: '4684640c-ad9d-445c-8811-e2563217d2bf',
    title: 'Our Children (À perdre la raison)',
    genres: ['Bildungsroman'],
    publicationDate: '6/26/2002',
    publisher: 'Pixope',
    summary:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    isbn: '729352237-1',
    language: 'Finnish',
    pageCount: 442,
    price: 94.21,
    format: ['Paperback', 'E-Book'],
    authorId: '32b4a18e-bcc8-49c7-a7ce-2cda6aff382c'
  },
  {
    _id: 'd3bbfce7-acdc-4ac1-9a30-a063fffbc305',
    title: 'Venus in Fur (La Vénus à la fourrure)',
    genres: [
      'Families & Relationships',
      'Fiction',
      'Historical fiction',
      'Self-help'
    ],
    publicationDate: '1/9/1960',
    publisher: 'Jatri',
    summary:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    isbn: '274255635-4',
    language: 'Kyrgyz',
    pageCount: 922,
    price: 44.13,
    format: ['Hardcover'],
    authorId: '28208705-64e2-4d51-8bef-c9d1fe00ff0d'
  },
  {
    _id: '9f882913-5399-4b47-b430-3032272ce880',
    title: 'Fire in the Sky',
    genres: [
      'Families & Relationships',
      'Contemporary',
      'Paranormal',
      'Mystery',
      'Dystopian'
    ],
    publicationDate: '3/28/1980',
    publisher: 'Brainbox',
    summary:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    isbn: '075163148-5',
    language: 'Malagasy',
    pageCount: 262,
    price: 48.16,
    format: ['E-Book', 'Hardcover'],
    authorId: 'c6b583b0-8011-496d-a23b-8d6e62d43a38'
  },
  {
    _id: 'da9ac323-6abb-4b92-ab05-ccfcbcbd2636',
    title: 'Tale of Cinema (Geuk jang jeon)',
    genres: [
      'Southern Gothic Fiction',
      'Art',
      'Guide / How-to',
      'Dystopian',
      'Personal Development'
    ],
    publicationDate: '1/24/1901',
    publisher: 'Photobug',
    summary:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    isbn: '178796448-5',
    language: 'Bislama',
    pageCount: 975,
    price: 8.97,
    format: ['Paperback', 'Hardcover'],
    authorId: '9c605d7e-5ca6-4796-9626-f406685f54b1'
  },
  {
    _id: 'e38ee52b-f3e8-4abf-b759-994f002bb1e6',
    title: 'Trust Us, This Is All Made Up',
    genres: [
      'Contemporary',
      'Paranormal',
      'Personal Development',
      'Travel',
      'Dystopian'
    ],
    publicationDate: '11/18/2012',
    publisher: 'Flashdog',
    summary:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '024614478-5',
    language: 'Macedonian',
    pageCount: 914,
    price: 46.96,
    format: ['Hardcover', 'E-Book', 'Paperback'],
    authorId: '11dd75aa-0e99-46cb-aa54-de092bdc7365'
  },
  {
    _id: '066a560b-bef4-49bf-b079-172a87b81ae0',
    title: 'Sketches of Frank Gehry',
    genres: ['Guide / How-to', 'Travel', 'Children’s'],
    publicationDate: '11/29/1927',
    publisher: 'Gigaclub',
    summary:
      'Morbi porttitor lorem _id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    isbn: '624723799-5',
    language: 'Lithuanian',
    pageCount: 223,
    price: 99.76,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: 'e28d16d0-eba7-45cb-96a0-15520fafd03c'
  },
  {
    _id: '8436cffe-c898-49a4-9f8a-fab26720fb52',
    title: 'Rio 2',
    genres: ['Fiction'],
    publicationDate: '1/20/1939',
    publisher: 'Photobug',
    summary: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    isbn: '115367940-X',
    language: 'Macedonian',
    pageCount: 651,
    price: 68.19,
    format: ['Paperback'],
    authorId: '3e877cfc-89d2-426f-9f9c-b369a04eb4c7'
  },
  {
    _id: '0d73b955-e519-4aa7-a360-a8996a1b52bf',
    title: 'Gainsbourg (Vie Héroïque)',
    genres: ['Contemporary', 'Motivational', 'Memoir'],
    publicationDate: '8/21/1923',
    publisher: 'Yotz',
    summary:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor _id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    isbn: '853421202-3',
    language: 'Malayalam',
    pageCount: 907,
    price: 94.1,
    format: ['E-Book', 'Hardcover'],
    authorId: '66a2d10a-f895-4e93-9eb6-3abfa87bc211'
  },
  {
    _id: '584e88aa-b946-4877-964e-71f02ac26d40',
    title: 'Wrong Guy, The',
    genres: ['Mystery', 'Motivational', 'Horror'],
    publicationDate: '10/20/1971',
    publisher: 'Yakidoo',
    summary:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit _id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    isbn: '910426460-6',
    language: 'Persian',
    pageCount: 59,
    price: 53.95,
    format: ['E-Book', 'Paperback'],
    authorId: '71d6bac3-13d3-48ec-adc5-50169e4567a0'
  },
  {
    _id: '44b611da-ded8-464b-9357-15029e393a8e',
    title: 'Drumline',
    genres: ['Thriller', 'Science Fiction', 'Historical fiction', 'History'],
    publicationDate: '8/21/1959',
    publisher: 'Centidel',
    summary:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus _id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    isbn: '974890723-6',
    language: 'Albanian',
    pageCount: 186,
    price: 28.09,
    format: ['Paperback', 'Hardcover'],
    authorId: 'd591b088-c7e4-472d-a075-884586a51bf8'
  },
  {
    _id: '343f5da9-14f8-405b-974a-45f36ceb8a79',
    title: 'The Kiss of Her Flesh',
    genres: ['Paranormal'],
    publicationDate: '4/8/1961',
    publisher: 'Fanoodle',
    summary:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    isbn: '909757864-7',
    language: 'Icelandic',
    pageCount: 658,
    price: 96.6,
    format: ['E-Book'],
    authorId: '6a072217-4ef7-4c73-9117-7a51f0cae605'
  },
  {
    _id: '091c8a9d-cde6-4a0a-b697-cb14c0cb0000',
    title: 'Norte, the End of History',
    genres: ['Motivational', 'Travel'],
    publicationDate: '6/29/1943',
    publisher: 'Eabox',
    summary:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    isbn: '708768214-8',
    language: 'Fijian',
    pageCount: 690,
    price: 74.4,
    format: ['Paperback', 'E-Book', 'Hardcover'],
    authorId: '9f78081d-47dd-4740-b06e-36c00d6dabec'
  },
  {
    _id: '2657574a-ff92-46ff-8ac3-2cc2887d9676',
    title: 'Trespasser, The',
    genres: ['Contemporary', 'Families & Relationships', 'Guide / How-to'],
    publicationDate: '8/2/1998',
    publisher: 'Topiclounge',
    summary:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque _id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    isbn: '527571473-4',
    language: 'Dari',
    pageCount: 826,
    price: 89.3,
    format: ['Paperback', 'Hardcover', 'E-Book'],
    authorId: 'b5f4b1de-bf43-4106-840b-bd0dd7e5ff37'
  },
  {
    _id: '09c3f85b-1511-4029-b23c-3b32466ae12b',
    title: 'Intimate Lighting (Intimni osvetleni)',
    genres: ['Gothic', 'Adventure'],
    publicationDate: '12/20/1954',
    publisher: 'Flashpoint',
    summary:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    isbn: '724944005-5',
    language: 'Hungarian',
    pageCount: 626,
    price: 95.2,
    format: ['Hardcover', 'E-Book'],
    authorId: '51e0eb6e-7d43-4fd3-8f15-671bb4da1d05'
  }
];
const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  const bookCollection = await books();
  const authorCollection = await authors();

  await authorCollection.insertMany(authList);

  await bookCollection.insertMany(bookList);

  console.log('Done seeding database');
  await closeConnection();
};

main().catch(console.log);
