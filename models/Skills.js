/*******************************************************************************
*                   OBJECT MODEL FOR THE SKILLS LIST
*******************************************************************************/

const moment = require('moment')

/** This function computes the overall time from a experiences list */
function computeTime (experiences) {
  // builds an experience list with non overlapping periods, by forcing end
  // times to the start time of the overlapping xp.
  const nonOverlap = []
  for (a of experiences) {
    for (b of experiences) {
      if (b.start > a.start && b.start < a.end) b.start = a.end
    }
    nonOverlap.push(a)
  }
  // then adds all the experiences durations
  let overall = 0
  for (xp of nonOverlap) {
    overall += moment.duration(xp.end - xp.start).asMonths()
  }
  return Math.round(overall)
}

/** This is the SKILLS class */
exports.Skills = class Skills extends Array {
  constructor () {
    super()
  }

  /** returns the skill index for the given skill in this, or -1 if not found */
  indexOf (skill) {
    for (const i in this) {
      if (this[i].id === skill.id)  return i
    }
    return -1
  }

  /**
   * Adds a skill experience.
   * If the skill doesn't exists, it's created and its xp list is initialized.
   * If it exists, we add the xp to its xp list.
   *   skill is a { id, name } object
   *   start and end are Date objects
   */
  addExperience (skill, start, end) {
    let idx = this.indexOf(skill)
    if (idx === -1) {
      this.push({
        id: skill.id,
        name: skill.name,
        experiences: [{ start, end }]
      })
    } else {
      this[idx].experiences.push({ start, end })
    }
  }

  toJson () {
    return JSON.stringify(this.map(skill => {
      return {
        id: skill.id,
        name: skill.name,
        durationInMonths: computeTime(skill.experiences)
      }
    }))
  }
}
