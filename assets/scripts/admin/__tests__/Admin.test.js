/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Admin from '../Admin'
import configureStore from 'redux-mock-store'

describe('Admin', () => {
  // setting the initial state
  const initialState = {
    admin: {
      isAuthenticated: true
    }
  }

  // creating the mock store
  const mockStore = configureStore()

  let store, container

  // creating a shallow rendered element for testing
  beforeEach(() => {
    store = mockStore(initialState)
    // rendering the shallow element
    // shallow elements doesn't support React.Fragments
    container = shallow(<Admin store={store} />)
  })

  // testing if Admin component is rendered
  it('should render Admin Component', () => {
    expect(container.length).toEqual(1)
  })

  // testing if AdminHome is rendered when isAuthenticated is true
  it('should render Admin Home with isAuthenticated is true', () => {
    expect(container.find('Admin').dive().find('AdminHome').length).toEqual(1)
  })
})
