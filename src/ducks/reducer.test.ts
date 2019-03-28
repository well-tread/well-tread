import reducer from './reducer';
import {updateUID, updateProfilePicture, updateDisplayName, updateIsAnonymous, updateFavorites, updateCompletes,
    updateTopHiking, updateTopBiking, updateTopRunning} from './reducer';

it('updateUID should return an object with a type of UPDATE_UID and a payload of a new UID', ()=>{
    let action = updateUID('newUID');
    expect(action.type).toEqual('UPDATE_UID');
    expect(action.payload).toEqual('newUID');
})

it('updateProfilePic should return an object with a type of UPDATE_PROFILE_PICTURE and a payload of a new pic link', ()=>{
    let action = updateProfilePicture('new picture');
    expect(action.type).toEqual('UPDATE_PROFILE_PICTURE');
    expect(action.payload).toEqual('new picture');
})

it('updateDisplayName should return an object with a type of UPDATE_DISPLAY_NAME and a payload of a new display name', ()=>{
    let action = updateDisplayName('name jeff');
    expect(action.type).toEqual('UPDATE_DISPLAY_NAME');
    expect(action.payload).toEqual('name jeff');
})

it('updateIsAnonymous should return an object with a type of UPDATE_IS_ANONYMOUS and a payload of a true/false value', ()=>{
    let action = updateIsAnonymous(true);
    expect(action.type).toEqual('UPDATE_IS_ANONYMOUS');
    expect(action.payload).toEqual(true);
})

it('updateFavorites should return an object with a type of UPDATE_FAVORITES and a payload of an array of objects each containing an id, type, and trail', ()=>{
    let action = updateFavorites([{id:'id here', type:'hiking', trail:'this can have any value'}]);
    expect(action.type).toEqual('UPDATE_FAVORITES');
    expect(action.payload[0].id).toEqual('id here');
    expect(action.payload[0].type).toEqual('hiking');
    expect(action.payload[0].trail).toEqual('this can have any value');
})

it('updateCompletes should return an object with a type of UPDATE_COMPLETES and a payload of an array of objects each containing an id, type, and trail', ()=>{
    let action = updateCompletes([{id:'id here', type:'hiking', trail:'this can have any value'}]);
    expect(action.type).toEqual('UPDATE_COMPLETES');
    expect(action.payload[0].id).toEqual('id here');
    expect(action.payload[0].type).toEqual('hiking');
    expect(action.payload[0].trail).toEqual('this can have any value');
})

it('updateTopHiking should return an object with a type of UPDATE_TOP_HIKING and a payload of an array of trails', ()=>{
    let action = updateTopHiking({trail:[{name:'cool hiking trail', length:8}]});
    expect(action.type).toEqual('UPDATE_TOP_HIKING');
    expect(action.payload.trail[0].name).toEqual('cool hiking trail');
    expect(action.payload.trail[0].length).toEqual(8);
})

it('updateTopBiking should return an object with a type of UPDATE_TOP_BIKING and a payload of an array of trails', ()=>{
    let action = updateTopBiking({trail:[{name:'cool biking trail', length:20}]});
    expect(action.type).toEqual('UPDATE_TOP_BIKING');
    expect(action.payload.trail[0].name).toEqual('cool biking trail');
    expect(action.payload.trail[0].length).toEqual(20);
})

it('updateTopRunning should return an object with a type of UPDATE_TOP_RUNNING and a payload of an array of trails', ()=>{
    let action = updateTopRunning({trail:[{name:'cool running trail', length:12}]});
    expect(action.type).toEqual('UPDATE_TOP_RUNNING');
    expect(action.payload.trail[0].name).toEqual('cool running trail');
    expect(action.payload.trail[0].length).toEqual(12);
})

it('reducer should work correctly when passed in an updateUID action', ()=>{
    let action = updateUID('newUID');

    let state = {
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

    let actualResult = reducer(state, action);

    expect(actualResult.uid).toEqual('newUID');
})

it('reducer should work correctly when passed in a profile picture action', ()=>{
    let action = updateProfilePicture('not empty');

    let state = {
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

    let actualResult = reducer(state, action);

    expect(actualResult.profilePicture).toEqual('not empty')
})

it('reducer expects isAnonymous to update to true',()=>{
    let action = updateIsAnonymous(true);

    let state = {
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

    let actualResult = reducer(state, action);

    expect(actualResult.isAnonymous).toEqual(true);
})

it('reducer expects isAnonymous to update to false',()=>{
    let action = updateIsAnonymous(false);

    let state = {
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

    let actualResult = reducer(state, action);

    expect(actualResult.isAnonymous).toEqual(false);
})

it('reducer should work correctly when passed in an updateDisplayName object', ()=>{
    let action = updateDisplayName('name jeff');

    let state = {
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

    let actualResult = reducer(state, action);

    expect(actualResult.displayName).toEqual('name jeff');
})

it('reducer should work correctly when passed in an updateFavorites action', ()=>{
    let action = updateFavorites([{id:'trailID', type:'hiking', trail:'trail can have any type'}]);

    let state = {
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

    let actualResult = reducer(state, action);

    expect(actualResult.favorites[0].id).toEqual('trailID');
    expect(actualResult.favorites[0].type).toEqual('hiking');
    expect(actualResult.favorites[0].trail).toEqual('trail can have any type');
})