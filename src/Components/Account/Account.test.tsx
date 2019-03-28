import React from 'react';
import Account,{mapStateToProps} from './Account';
import ConversionDialog from './ConversionDialog/ConversionDialog';
import Preferences from './Preferences/Preferences';
import MapMarker from './MapMarker/MapMarker';

import store from '../../ducks/store';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

// describe('Unit tests for Account', ()=>{
//     it('mapStateToProps returns the proper values', ()=>{
        
//         let actualValue = mapStateToProps(store);
//     })
// })

describe('Snapshot tests for Account', ()=>{

    it('Account component renders correctly', ()=> {
        const tree = renderer.create(
        <Provider store={store}>
        <Account />
        </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it('ConversionDialog component renders correctly when closed', ()=>{
        const tree = renderer.create(
            <Provider store={store}>
            <Account>
                <ConversionDialog 
                    isConversionDialogOpen={false} 
                    toggleConversionDialog={()=>console.log('toggle conversion dialog function')}
                />
    
            </Account>
            </Provider>
        
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it('ConversionDialog component renders correctly when open', ()=>{
        const tree = renderer.create(
            <Provider store={store}>
            <Account>
                <ConversionDialog 
                    isConversionDialogOpen={false} 
                    toggleConversionDialog={()=>console.log('toggle conversion dialog function')}
                />
    
            </Account>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it('Preferences component renders correctly when closed', ()=>{
        const tree = renderer.create(
            <Provider store={store}>
            <Account>
                <Preferences 
                    uid='abc123'
                    displayName='jeff'
                    zipCode='6669'
                    preferencesIsOpen={false}
                    togglePreferences={()=>console.log('toggle Preferences dialog function')}
                    handleChange={()=>console.log('handleChange function')}
                />
    
            </Account>
            </Provider>
        ).toJSON();
    })
    
    it('Preferences component renders correctly when open', ()=>{
        const tree = renderer.create(
            <Provider store={store}>
            <Account>
                <Preferences 
                    uid='abc123'
                    displayName='jeff'
                    zipCode='6669'
                    preferencesIsOpen={true}
                    togglePreferences={()=>console.log('toggle Preferences dialog function')}
                    handleChange={()=>console.log('handleChange function')}
                />
    
            </Account>
            </Provider>
        ).toJSON();
    })
    
    it('map marker shoud render correctly', ()=>{
        const tree = renderer.create(
            <Provider store={store}>
            <Account>
            <MapMarker trailtype='hiking' favorite={true} lat={24} lng={24} />
            </Account>
            </Provider>
        )
    })

})

