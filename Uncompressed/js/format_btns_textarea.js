window.convertToRTE = null;

(function(){
	var btnsAndSelectors, $RTE,
		HIGHLIGHTED_CLASS = "highlighted";
	
	convertToRTE = function(textarea){
		// first insert a container, remove textarea,
		// and then insert RTE in container
		var container = document.createElement("div"),
			parentNode = textarea.parentNode,
			val = textarea.value;
			
		$RTE = document.createElement("div");			
		parentNode.insertBefore(container, textarea);
		parentNode.removeChild(textarea);
		container.appendChild($RTE);
		
		btnsAndSelectors = getButtonsAndSelectors($RTE);
		var btnRow = document.createElement("div");
		for(var i = 0, len = btnsAndSelectors.length; i < len; i++)
			btnRow.appendChild(btnsAndSelectors[i]);
		container.insertBefore(btnRow, $RTE);
		
		var btnReHighlightEvents = ["keydown", "click"];	
		for(var i = 0, len = btnReHighlightEvents.length; i < len; i++)
			$RTE.on(btnReHighlightEvents[i], highlightBtnsBasedOnCaret);
	}

	// if caret is here <b><i>HERE</i></b>
	// then highlight bold and italics button
	function highlightBtnsBasedOnCaret(){
		var caret = window.getSelection().getRangeAt(0),
			container = caret.startContainer,
			btn;
		
		// first remove highlight from existing ones
		$("." + HIGHLIGHTED_CLASS).removeClass(HIGHLIGHTED_CLASS);
		
		while(container !== $RTE){
			btn = btnsAndSelectors.find(function(btnAndSelector){
				var sel = btnAndSelector[1];
				if(container.matches(sel)) return btnAndSelector[0];
			});
			
			if(btn) btn.addClass(HIGHLIGHTED_CLASS);
			container = container.parentNode;
		}
	}

	function getButtonsAndSelectors($RTE){
		function template(btnName, btnSel, htmlToInsert){
			var btn = document.createElement("button");
			btn.html(btnName);
			
			btn.on("click", function(){
				if(btnName in ["bold", "italics", "underline"]){
					$RTE.trigger("keyup", {keyCode: });
				}
				var range = window.getSelection().getRangeAt(0);
				
				if(!range.collapsed){
					
				}
			});
			
			return [btn, btnSel];
		}
		return [
			(function bold(){
				var btn = document.createElement("button");
				
				
				
				return [btn, "b"];
			})(),
			(function italics(){
				
			})(),
			(function underline(){
				
			})(),
			(function placeholder(){
				
			})()
		];
	}
})();