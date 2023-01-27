import { expect } from 'chai';

import * as Utilities from '../dist/utils.js';

describe('Utilities', function () {
  it('apply mixins', function () {
    class JumperMixin {
      jump() {
        this._jumping = true;
      }

      isJumping() {
        return this._jumping;
      }
    }

    class Player {}

    Utilities.applyMixins(Player, JumperMixin);

    const player = new Player();
    player.jump();
    expect(player.isJumping()).to.equal(true);
  });
});
