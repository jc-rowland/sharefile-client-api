/**
 *
 *
 * @class SharefileSearchResults
 */
class SharefileSearchResults {
  constructor({ PartialResults, Results, TimedOut }) {
    Object.assign(this, { PartialResults, Results, TimedOut });
  }
}

module.exports = SharefileSearchResults;