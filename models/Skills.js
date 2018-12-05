/*******************************************************************************
*                   OBJECT MODEL FOR THE SKILLS LIST
*******************************************************************************/

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
    let skillEntry = {}
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
}
