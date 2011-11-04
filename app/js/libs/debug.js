var Debug = {
	collapsed: true,
	lastClassName: null,
	log: function(classInstance, methodName, value) {
		if(classInstance.debug === true) {
			if(this.lastClassName !== classInstance.debugClassName) {
				if(this.lastClassName !== null) console.groupEnd();
				this.lastClassName = classInstance.debugClassName;
				if(this.collapsed === true) console.groupCollapsed(classInstance.debugClassName);
				else console.group(classInstance.debugClassName);
			}
			console.debug('[' + methodName + '()] ' + value);
		}
	}
};