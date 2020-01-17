export type TMenuItem = {
	label: string;
	url: string;
	iconComponent: any;
	adminLink?: boolean;
	isAdmin?: boolean;
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
	valid?: boolean;
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

export type THistoryRecord = {
	id: number;
	name: string;
	order_products: string;
	type: string;
	user_id: number;
	date: string;
	user_name: string;
};

export type THistoryProduct = {
	productId: number;
	count: number;
	newQ: number;
	name: string;
	price: string;
	quantity: number;
	index: string;
	quantityType: string;
};
