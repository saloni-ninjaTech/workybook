const router = require("express").Router()
const isAuth = require('../middleware/auth')

router.use('/auth', require('./auth'))
router.use('/user', require('./user'))
router.use('/config', require('./projectSetupConfig'))
router.use('/classroom', isAuth, require('./classroom'))
router.use('/grade', require('./grade'))
router.use('/student', isAuth, require('./student'))
router.use('/subject', isAuth, require('./subject'))
router.use('/content', isAuth, require('./content'))
router.use('/commonCoreStandard', isAuth, require('./commonCoreStandard'))
router.use('/collection', isAuth, require('./collection'))
router.use('/assignment', isAuth, require('./assignment'))
router.use('/submittedAssignment', isAuth, require('./submittedAssignment'))
router.use('/studentActivity', isAuth, require('./studentActivity'))
router.use('/assignmentGrade', isAuth, require('./assignmentGrade'))
router.use('/notification', isAuth, require('./notification'))

module.exports = router