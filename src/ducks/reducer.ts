import axios from 'axios';
import { CardActionArea } from '@material-ui/core';
import { number } from 'prop-types';

export interface Trails{
    trail:{
        ascent?:number,
        conditionDate?:string,
        conditonDetails?:string,
        conditionStatus?:string,
        descent?:number,
        difficulty?:string,
        high?:number,
        id?:number,
        imgMedium?:string,
        imgSmall?:string,
        imgSmallMed?:string,
        imgSqSmall?:string,
        latitude?:number,
        length?:number,
        location?:string,
        longitude?:number,
        low?:number,
        name?:string,
        starVotes?:number,
        stars?:number,
        summary?:string,
        type?:string,
        url?:string
    }[]
}

let initialState={
    uid:'',
    profilePicture:'',
    displayName:'',
    topHiking:[],
    topBiking:[],
    topRunning:[],
    favorites:[],
    completes:[],
    userLat:0,
    userLon:0,
    isAnonymous:false
}


const UPDATE_UID = 'UPDATE_UID';
const UPDATE_TOP_HIKING = 'UPDATE_TOP_HIKING';
const UPDATE_TOP_BIKING = 'UPDATE_TOP_BIKING';
const UPDATE_TOP_RUNNING = 'UPDATE_TOP_RUNNING';

const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';
const UPDATE_DISPLAY_NAME = 'UPDATE_DISPLAY_NAME';

const UPDATE_FAVORITES = 'UPDATE_FAVORITES';
const UPDATE_COMPLETES = 'UPDATE_COMPLETES';

const UPDATE_IS_ANONYMOUS = 'UPDATE_IS_ANONYMOUS';

export function updateUID(newUID:string){
    return{
        type:UPDATE_UID,
        payload:newUID
    }
}
export function updateTopHiking(trails:Trails){
    return{
        type:UPDATE_TOP_HIKING,
        payload:trails
    }
}
export function updateTopBiking(trails:Trails){
    return{
        type:UPDATE_TOP_BIKING,
        payload:trails
    }
}
export function updateTopRunning(trails:Trails){
    return{
        type:UPDATE_TOP_RUNNING,
        payload:trails
    }
}

export function updateProfilePicture(newPic:string){
    return{
        type:UPDATE_PROFILE_PICTURE,
        payload:newPic
    }
}

export function updateDisplayName(newName:string){
    return{
        type:UPDATE_DISPLAY_NAME,
        payload:newName
    }
}

export function updateFavorites(favorites:{id:string, type:string, trail:any}[]){
    return{
        type:UPDATE_FAVORITES,
        payload:favorites
    }
}

export function updateCompletes(completes:{id:string, type:string, trail:any}[]){
    return{
        type:UPDATE_COMPLETES,
        payload:completes
    }
}

export function updateIsAnonymous(isAnonymous:boolean){
    return{
        type:UPDATE_IS_ANONYMOUS,
        payload:isAnonymous
    }
}

export default function reducer(state:any =initialState, action:{type:string, payload:any}){

    switch(action.type){
    
    case UPDATE_UID:
    return{
        ...state,
        uid:action.payload
    }
    case UPDATE_TOP_HIKING:
    return{
        ...state,
        topHiking:action.payload
    }
    case UPDATE_TOP_BIKING:
    return{
        ...state,
        topBiking:action.payload
    }
    case UPDATE_TOP_RUNNING:
    return{
        ...state,
        topRunning:action.payload
    }
    case UPDATE_DISPLAY_NAME:
    return{
        ...state,
        displayName:action.payload
    }
    case UPDATE_PROFILE_PICTURE:
    return{
        ...state,
        profilePicture:action.payload
    }

    case UPDATE_FAVORITES:
    return{
        ...state,
        favorites:action.payload
    }

    case UPDATE_COMPLETES:
    return{
        ...state,
        completes:action.payload
    }

    case UPDATE_IS_ANONYMOUS:
    return{
        ...state,
        isAnonymous:action.payload
    }
        
    default:
    return state;

    
    }

}