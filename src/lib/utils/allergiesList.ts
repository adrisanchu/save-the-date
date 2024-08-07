import type { Allergy } from '$lib/types';

export let allergies: Allergy[] = [
	{
		accessor: 'gluten',
		name: 'Gluten',
		checked: false
	},
	{
		accessor: 'celiac',
		name: 'Celíaco',
		checked: false
	},
	{
		accessor: 'egg',
		name: 'Huevo',
		checked: false
	},
	{
		accessor: 'lactose',
		name: 'Lactosa',
		checked: false
	},
	{
		accessor: 'fructose',
		name: 'Fructosa',
		checked: false
	},
	{
		accessor: 'fish',
		name: 'Pescado',
		checked: false
	},
	{
		accessor: 'seafood',
		name: 'Marisco',
		checked: false
	},
	{
		accessor: 'peanuts',
		name: 'Cacahuetes',
		checked: false
	},
	{
		accessor: 'other',
		name: 'Otros (especificar a continuación)',
		checked: false
	}
];
