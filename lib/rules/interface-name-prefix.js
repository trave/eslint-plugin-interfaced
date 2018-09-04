const {visitInterfaceNodes} = require('../visitors');
const {resolveClassName} = require('../ast-utils');

module.exports = {
	meta: {
		docs: {
			description: 'enforce "I" prefix for interface name'
		}
	},
	create: (context) => {
		/**
		 * @param {ASTNode} interfaceNode
		 */
		function check(interfaceNode) {
			const interfaceName = resolveClassName(interfaceNode);

			if (!interfaceName.startsWith('I')) {
				context.report({
					node: interfaceNode,
					message: `Interface name "${interfaceName}" should start with "I".`
				});
			}
		}

		return visitInterfaceNodes(check, context.getSourceCode());
	}
};