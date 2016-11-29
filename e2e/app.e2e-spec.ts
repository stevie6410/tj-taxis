import { TjTaxisPage } from './app.po';

describe('tj-taxis App', function() {
  let page: TjTaxisPage;

  beforeEach(() => {
    page = new TjTaxisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
