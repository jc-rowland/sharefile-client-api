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

export default  SharefileSearchResults;