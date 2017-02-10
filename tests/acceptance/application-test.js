import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('#foo').text(), 'bar');
    assert.equal(find('#special').text(), '© or ü or ß');
  });
});
