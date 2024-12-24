import { ObjectId } from 'bson';

export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews', 'memberRank'];
export const availableMemberSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews'];
export const availableOptions = ['propertyBarter', 'propertyRent'];
export const availablePropertySorts = [
	'createdAt',
	'updatedAt',
	'propertyLikes',
	'propertyViews',
	'propertyRank',
	'proeprtyPrice',
];
export const availableBoardArticleSorts = ['createdAt', 'updatedAt', 'articleLikes', 'articleViews'];
export const availableCommentSorts = ['createdAt', 'updatedAt'];

/** IMAGE CONFIGURATION  */
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { T } from './types/common';
import { pipeline } from 'stream';

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
export const getSerialForImage = (filename: string) => {
	const ext = path.parse(filename).ext;
	return uuidv4() + ext; // jibrish name => jpg.png.jpeg
};

export const shapeIntoMongoObjectId = (target: any) => {
	return typeof target === 'string' ? new ObjectId(target) : target;
};

export const lookupAuthMemberLiked = (memberId: T, targetRefId: string = '$_id') => {
	return {
		$lookup: {
			from: 'likes',
			let: {
				localLikeRefId: targetRefId,
				localMemberId: memberId,
				localMyFavorite: true,
			},
			pipeline: [
				{
					$match: {
						$expr: {
							$and: [{ $eq: ['$likeRefId', '$$localLikeRefId'] }, { $eq: ['$memberId', '$$localMemberId'] }],
						},
					},
				},
				{
					$project: {
						_id: 0,
						memberId: 1,
						likeRefId: 1,
						myFavorite: '$$localMyFavorite',
					},
				},
			],
			as: 'meLiked',
		},
	};
};

interface LookupAuthMemberFollowed {
	followerId: T;
	followingId: string;
}

export const lookupAuthMemberFollowed = (input: LookupAuthMemberFollowed) => {
	const { followerId, followingId } = input;
	return {
		$lookup: {
			from: 'follows',
			let: {
				localFollowerId: followerId,
				localFollowingId: followingId,
				localMyFavorite: true,
			},
			pipeline: [
				{
					$match: {
						$expr: {
							$and: [{ $eq: ['$followerId', '$$localFollowerId'] }, { $eq: ['$followingId', '$$localFollowingId'] }],
						},
					},
				},
				{
					$project: {
						_id: 0, // DOCS ID x
						followerId: 1,
						followingId: 1,
						myFollowing: '$$localMyFavorite',
					},
				},
			],
			as: 'meFollowed',
		},
	};
};

export const lookupMember = {
	$lookup: {
		from: 'members', // 2 members collectiondan
		localField: 'memberId', // 1 memberId ni qolga olib
		foreignField: '_id', // 3 id nomi bn oxtaryabmiz agar topsak
		as: 'memberData', // 4 uning qiymatini memberData bn belgilashni takidlayabmiz
	},
};

export const lookupFollowingData = {
	$lookup: {
		from: 'members', // 2 members collectiondan
		localField: 'followingId', // 1 memberId ni qolga olib
		foreignField: '_id', // 3 id nomi bn oxtaryabmiz agar topsak
		as: 'followingData', // 4 uning qiymatini memberData bn belgilashni takidlayabmiz
	},
};

export const lookupFollowerData = {
	$lookup: {
		from: 'members', // 2 members collectiondan
		localField: 'followerId', // 1 memberId ni qolga olib
		foreignField: '_id', // 3 id nomi bn oxtaryabmiz agar topsak
		as: 'followerData', // 4 uning qiymatini memberData bn belgilashni takidlayabmiz
	},
};

export const lookupFavorite = {
	$lookup: {
		from: 'members', // 2 members collectiondan
		localField: 'favoriteProperty.memberId', // 1 memberId ni qolga olib
		foreignField: '_id', // 3 id nomi bn oxtaryabmiz agar topsak
		as: 'favoriteProperty.memberData', // 4 uning qiymatini memberData bn belgilashni takidlayabmiz
	},
};
