function onLoad() {
  String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
 
GlideForm.prototype.setNewFormMessage = function (message) {
	var tableId = g_form.getTableName().toString().capitalizeFirstLetter();
 
	var htmlBlock = '<span class="section " id="section-test" data-header-only="false"><div id="' + tableId + '.section_header_spacer"></div><div class="outputmsg_container" style="display: block;" id="output_messages"><button class="btn btn-icon close icon-cross" onclick="GlideUI.get().clearOutputMessages(this); return false;"><span class="sr-only">Close Messages"</span></button><div class="outputmsg_div"><div class="outputmsg outputmsg_ notification notification-"><img class="outputmsg_image" src="images/outputmsg__24.gifx" alt=""><span class="outputmsg_text">' + message + '</span></div></div></div>';
 
	jQuery("[tab_caption=" + tableId + "]").after(htmlBlock);
};
 
 
var message = g_form.getValue('reopen_count');
g_form.setNewFormMessage('Reopen count : '+message);
	}
