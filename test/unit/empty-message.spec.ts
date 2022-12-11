
import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage App Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/components/empty-message/empty-message'))
      .inView('<empty-message message.bind="myMessage" showmore.bind="isShowMore"></empty-message>')
      .boundTo({myMessage: 'hello world', isShowMore: true});
  });

  afterEach(() => component.dispose());

  it('should include button text', done => {
    component.create(bootstrap).then(() => {
      const view = component.element;
      expect(view.textContent.trim()).toEqual(expect.stringContaining('Enter a city?'));
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should have message', done => {
    component.boundTo({myMessage: 'wassup', isShowMore: true}).create(bootstrap).then(() => {
      const view = component.element;
      expect(view.textContent.trim()).toEqual(expect.stringContaining('wassup'));
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should not have button text', done => {
    component.boundTo({myMessage: 'wassup', isShowMore: false}).create(bootstrap).then(() => {
      const view = component.element;
      expect(view.textContent.trim()).not.toEqual(expect.stringContaining('Enter a city?'));
      
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });


  it('button should call method', done => {
    component.boundTo({myMessage: 'test', isShowMore: true}).create(bootstrap).then(() => {
      const view = component.element;
      const btnEl = document.querySelector('.btn');
      
      const spy = jest.spyOn(component, 'handleUserAction');
     
   
      expect(spy).toHaveBeenCalled();
      //expect(isClicked).toBe(true);
      done();
    }).catch(e => {
      console.log(e)
      fail(e);
      done();
    });
  });


});
