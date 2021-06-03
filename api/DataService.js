import axios from 'axios';
import groups from '~/api/groups.js';
import groupTypes from '~/api/groupTypes.js';
import police from '~/api/police.js';
import calendar from '~/api/calendar.js';

export const GetGroups = async () => {
	//axios request
	return groups;
};

export const GetCalendar = async () => {
	//axios request
	return groups;
};

export const GetGroupTypes = async () => {
	//axios request
	return groupTypes;
};
export const GetPolice = async () => {
	//axios request
	return police;
};
