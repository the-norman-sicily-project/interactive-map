const TabSchema = [
  {
    displayText: 'Names',
    fields: [
      {
        displayText: 'English',
        path: 'labels.en',
      },
      {
        displayText: 'Italian',
        path: 'labels.it',
      },
    ],
  },
  {
    displayText: 'Community and\nPatronage',
    fields: [
      {
        displayText: 'Order',
        path: 'nsp_monasticIdentity',
      },
      {
        displayText: 'Subject of Dedication',
        path: 'nsp_subjectOfDedication',
      },
      {
        displayText: 'Gender',
        path: 'nsp_probableGender',
      },
      {
        displayText: 'Rank at Foundation',
        path: 'nsp_probableStatus',
      },
    ],
  },
  {
    displayText: 'Location',
    fields: [
      {
        displayText: 'Latitude',
        path: 'wgs_lat',
      },
      {
        displayText: 'Longitude',
        path: 'wgs_long',
      },
      {
        displayText: 'Altitude',
        path: 'wgs_alt',
      },
      {
        displayText: 'Historical Region',
        path: 'nsp_historicalProvince',
      },
    ],
  },
  {
    displayText: 'Sustainability',
    fields: [
      {
        displayText: 'Date(s) Visited',
        path: 'nsp_field_visit',
      },
    ],
  },
  {
    displayText: 'Attestation',
    fields: [
      {
        displayText: 'Types',
        path: 'nsp_attestationType',
      },
    ],
  },
  {
    displayText: 'Selected Sources\nand Notes',
    fields: [
      {
        displayText: 'Notes',
        path: 'nsp_notes',
      },
    ],
  },
  {
    displayText: 'Metadata',
    fields: [
      {
        displayText: 'Record Status',
        path: 'nsp_recordStatus',
      },
      {
        displayText: 'Creation Date',
        path: 'nsp_createdOn',
      },
      {
        displayText: 'Creation By',
        path: 'nsp_createdBy',
      },
      {
        displayText: 'Last Updated on',
        path: 'nsp_updatedOn',
      },
      {
        displayText: 'Updated By',
        path: 'nsp_updatedBy',
      },
    ],
  },
];

export default TabSchema;
