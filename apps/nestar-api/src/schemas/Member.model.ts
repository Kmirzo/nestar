import { Schema } from 'mongoose';
import { MemberAuthType, MemberStatus, MemberType } from '../libs/enums/member.enum';

const MemberSchema = new Schema(
	{
		memberType: {
			type: String,
			enum: MemberType,
			default: MemberType.USER,
		},

		memberStatus: {
			type: String,
			enum: MemberStatus,
			default: MemberStatus.ACTIVE,
		},

		memberAuthType: {
			type: String,
			enum: MemberAuthType,
			default: MemberAuthType.PHONE,
		},

		memberPhone: {
			type: String,
			index: { unique: true, sparse: true },
			required: true,
		},

		memberNick: {
			type: String,
			index: { unique: true, sparse: true },
			required: true,
		},

		memberPassword: {
			type: String,
			select: false,
			required: true,
		},

		memberFullName: {
			type: String,
		},

		memberImage: {
			type: String,
			default: '',
		},

		memberAddress: {
			type: String,
		},

		memberDesc: {
			type: String,
		},

		memberProperties: {
			type: Number,
			default: '',
		},

		memberArticles: {
			type: String,
			default: '',
		},

		memberFollowers: {
			type: String,
			default: '',
		},

		memberFollowings: {
			type: String,
			default: '',
		},

		memberViews: {
			type: String,
			default: '',
		},

		memberComments: {
			type: String,
			default: '',
		},

		memberRank: {
			type: String,
			default: '',
		},

		memberWarnings: {
			type: String,
			default: '',
		},

		memberBlocks: {
			type: String,
			default: '',
		},

		deletedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'members' },
);

export default MemberSchema;