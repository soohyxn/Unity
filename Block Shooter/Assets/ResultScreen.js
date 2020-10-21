#pragma strict
@script RequireComponent (Scorekeeper)

var skin : GUISkin;

private var scorekeeper : Scorekeeper;
private var state : String;

function Start () {
	scorekeeper = GetComponent(Scorekeeper) as Scorekeeper;
}
function TimeUp() {
	state = "Time Up";
	yield WaitForSeconds(3.0);
	state = "";
	yield WaitForSeconds(0.5);
	state = "Show Score";
	while(!Input.GetButtonDown("Fire1"))
		yield;
	Application.LoadLevel("Title");
}
function OnGUI() {
	GUI.skin = skin;
	
	var sw : int = Screen.width;
	var sh : int = Screen.height;
	
	if(state == "Time Up")
	{
		GUI.Label(Rect(0,0,sw,sh),"Time Up!!","Message");
	}else if(state == "Show Score") 
	{
		var scoreText : String = "Your Score is " + scorekeeper.score.ToString();
		GUI.Label(Rect(0,sh/4,sw,sh/4),scoreText,"Message");
		GUI.Label(Rect(0,sh/2,sw,sh/4),"Click to Exit","Message");
	}
}
function Update () {

}