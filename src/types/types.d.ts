export type TMenuItem = {
	label: string;
	url: string;
	iconComponent: any;
};

export type TProduct = {
	id?: string | number;
	name: string;
	product_index: string;
	supplier: string;
	quantity: number;
	quantityType: string;
	quantityAlert: number;
	price: string;
	picture: string | null;
};

export type TSelect = {
	value: string;
	name: string;
};

export type TFileType = {
	file: File | null;
	fileName: string;
	inputName: string;
};
