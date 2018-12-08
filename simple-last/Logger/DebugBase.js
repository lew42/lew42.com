class Another {}

const NewClass = DebugBase.extend(class NewClass extends Another {});

// or maybe

const NewClass = DebugBase.init(class NewClass extends DebugBase {

});


function extend(cls){
	return class extends cls {
		// put class definition here?
	}
}


// or just

class NewClass extends DebugBase {

}

NewClass.init();