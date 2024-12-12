import { ObjectId } from 'mongoose';

export interface T {
	[key: string]: any;
}

export interface StatisticModifier {
	_id: ObjectId;
	targetKey: string; // we can put here uniontype like { memberProperties | memberViews | memberFollowers | memberLikes} and mark it in propertyService targetKey
	modifier: number;
}
