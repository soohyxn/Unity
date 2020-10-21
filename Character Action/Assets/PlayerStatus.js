#pragma strict

private var life : int = 100;
private var score : int = 0;
private var effectFlag : boolean;
private var originalScoreColor : Color;
private var scoreStyle : GUIStyle;

var coinParticlePrefab : GameObject;
var damageParticlePrefab : GameObject;
var skin : GUISkin;

function CatchCoin (amount : int) {
		Instantiate(coinParticlePrefab,transform.position,transform.rotation);
		score += amount;
}
function ApplyDamage (amount : int) {
	effectFlag = true;
	yield WaitForSeconds(0.3);
	effectFlag = false;
	scoreStyle.normal.textColor = originalScoreColor;
	life -= amount;
	if(life <= 0) 
	{
		Instantiate(damageParticlePrefab,transform.position,transform.rotation);
		Destroy(transform.parent.gameObject);
	}
}
function OnGUI() {
	GUI.skin = skin;
	var rect1 : Rect = Rect(0,0,Screen.width,Screen.height);
	var rect2 : Rect = Rect(Screen.width/2,0,Screen.width,Screen.height);
	GUI.Label(rect1, "LIFE: " + life.ToString(),"Life");
	GUI.Label(rect2, "SCORE:" + score.ToString(),"Score");
}
function Start () {
	scoreStyle = skin.GetStyle("Life");
	originalScoreColor = scoreStyle.normal.textColor;
	effectFlag = false;
}

function Update () {
	if(effectFlag)
		scoreStyle.normal.textColor = Color.red * Mathf.Abs(Mathf.Sin(40.0 * Time.time));
}