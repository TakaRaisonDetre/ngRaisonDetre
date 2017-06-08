import { AnuthFirebasePage } from './app.po';

describe('anuth-firebase App', function() {
  let page: AnuthFirebasePage;

  beforeEach(() => {
    page = new AnuthFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
