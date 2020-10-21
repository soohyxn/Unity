#pragma strict
@script RequireComponent(Scorekeeper)

var switchInterval : float;
var rewardPoint : int;
var penaltyPoint :  int;
var skin : GUISkin;

private var scorekeeper : Scorekeeper;
private var targetIsRed : boolean;
private var switchTimer : float;

function TimeUp() {
	enabled = false;
}
private function GetTargetColorName() : String {
	return targetIsRed ? "Red" : "Blue";
}
function Start () {
	scorekeeper = GetComponent(Scorekeeper) as Scorekeeper;
	targetIsRed = true;
	switchTimer = switchInterval;
}
function Update () {
	switchTimer -= Time.deltaTime;
	if(switchTimer < 0.0)
	{
		targetIsRed = !targetIsRed;
		switchTimer = switchInterval;
	}
}
function OnDestroyBox(boxColorName : String) {
	if(boxColorName == GetTargetColorName())
	{
		scorekeeper.score += rewardPoint;
	}
	else
	{
		scorekeeper.score -= penaltyPoint;
	}
}
function OnGUI() {
	GUI.skin = skin;
	if(switchTimer < 1.5)
		return;

	var sw : int = Screen.width;
	var sh : int = Screen.height;
	var message : String = "Shoot " + GetTargetColorName() + "Boxes";
	GUI.color = targetIsRed ? Color.red : Color.blue;
	GUI.Label(Rect(0,sw/4,sw,sh/4),message,"Message");
}
function StartGame() {
	enabled = true;
}