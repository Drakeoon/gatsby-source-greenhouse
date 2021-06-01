'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DepartmentNode = exports.JobPostNode = undefined;

var _gatsbyNodeHelpers = require('gatsby-node-helpers');

var _gatsbyNodeHelpers2 = _interopRequireDefault(_gatsbyNodeHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createNodeHelpers = (0, _gatsbyNodeHelpers2.default)({
  typePrefix: `Greenhouse`
});

const createNodeFactory = _createNodeHelpers.createNodeFactory,
      generateNodeId = _createNodeHelpers.generateNodeId;


const JOB_POST_TYPE = `JobPost`;
const DEPARTMENT_TYPE = `Department`;

const JobPostNode = exports.JobPostNode = createNodeFactory(JOB_POST_TYPE, node => {
  node.slug = slugify(node.title);
  return node;
});

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text
}

const DepartmentNode = exports.DepartmentNode = createNodeFactory(DEPARTMENT_TYPE, node => {
  node.slug = slugify(node.name);
  node.children = node.jobPosts.map(jobPost => {
    return generateNodeId(JOB_POST_TYPE, jobPost.id);
  });
  return node;
});