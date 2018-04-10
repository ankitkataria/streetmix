/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import AdminLoginForm from '../AdminLoginForm'
import configureStore from 'redux-mock-store'

describe('AdminLoginForm', () => {
  // setting the initial state
  const initialState = {
    admin: {
      errors: {}
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
    container = shallow(<AdminLoginForm store={store} />)
  })

  // testing if AdminLoginForm component is rendered
  it('should render AdminLoginForm Component', () => {
    expect(container.length).toEqual(1)
  })

  // testing if form along with four input elements is rendered
  it('should render form and four input components', () => {
    expect(container.find('AdminLoginForm').dive().find('form').length).toEqual(1)
    expect(container.find('AdminLoginForm').dive().find('form').find('input').length).toEqual(4)
  })
})
