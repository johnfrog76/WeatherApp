import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage App Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('app'))
      .inView('<app></app>');
  });

  afterEach(() => component.dispose());

  it('should include title', done => {
    component.create(bootstrap).then(() => {
      const view = component.element;
      expect(view.textContent.trim()).toEqual(expect.stringContaining('Forecast'));
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
