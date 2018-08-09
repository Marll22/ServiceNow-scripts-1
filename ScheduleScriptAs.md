Client Script : 

var ssa = new ScheduleScriptAs('myScriptName');
ssa.setRunAs('USER_SYS_ID');
ssa.setScript('SCRIPT_TO_RUN');
ssa.runSecondsLater(10); //Add delay
ssa.schedule();

Script include:

var ScheduleScriptAs = Class.create();
ScheduleScriptAs.prototype = {
    initialize: function(name) {
		this.active = 'true';
		this.name = 'Run ScheduleScriptAs ' + name;
		this.run_type = 'once';
		this.run_start = new GlideDateTime();
		this.script = '';
		this.run_as = gs.getUserID();
		this.sys_name = this.name;
		this.sys_class_name = 'sysauto_script';
		this.runSecondsLater = 0;
    },
 
	runSecondsLater: function(seconds) {
		this.runSecondsLater += seconds;
		this.run_start = new GlideDateTime(this.run_start);
		this.run_start.addSeconds(seconds);
	},
 
	setRunAs: function(user_sys_id) {
		this.run_as = user_sys_id;
	},
 
	setScript: function(script) {
		this.script = script;
	},
 
	schedule: function() {
		var s = new GlideRecord(this.sys_class_name);
		s.initialize();
		s.active = this.active;
		s.name = this.name;
		s.run_type = this.run_type;
		s.run_start = this.run_start;
		s.script = this.script;
		s.run_as = this.run_as;
		s.sys_name = this.sys_name;
		var s_id = s.insert();
		this._deleteSchedule(s_id);
	},
 
	_deleteSchedule: function(sys_id) {
		gs.sleep(10000 + this.runSecondsLater); //Allow schedule to be run
		var s = new GlideRecord(this.sys_class_name);
		if(s.get(sys_id)) {
			s.deleteRecord();
		}
	},
 
 
    type: 'ScheduleScriptAs'
};
