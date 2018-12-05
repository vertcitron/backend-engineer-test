const fs = require('fs')
const { Skills } = require('./models/Skills.js')

/**
 * Reads data from file, parse it and extract useful data
 */
const freelancerFile = './exercise/freelancer.json'
if (!fs.existsSync(freelancerFile)) {
	console.log('File does not exists')
}
let freelancer = fs.readFileSync(freelancerFile, 'utf8')
freelancer = JSON.parse(freelancer).freelance;
const jobs = freelancer.professionalExperiences

/**
 * Initialize and populate the skills model
 */
const skills = new Skills()
for (job of jobs) {
	for (skill of job.skills) {
		skills.addExperience(skill, new Date(job.startDate), new Date(job.endDate))
	}
}

console.log(skills.toJson())
