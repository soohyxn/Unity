#pragma strict

var interval : float;
var redBoxPrefab : GameObject;
var blueBoxPrefab : GameObject;

private var nextIsRed : boolean;
private var timer : float;

function TimeUp() {
	enabled = false;
}
function Start () {
	nextIsRed = true;
	timer = 0.0;
}

function Update () {
	timer -= Time.deltaTime;
	if(timer < 0.0)
	{
		var offsx : float = Random.Range(-8.0,8.0);
		var offsz : float = Random.Range(-4.0,4.0);
		var position : Vector3 = transform.position + Vector3(offsx,0,offsz);
		
		var prefab : GameObject = nextIsRed ? redBoxPrefab : blueBoxPrefab;
		Instantiate(prefab, position, Random.rotation);
		
		timer = interval;
		nextIsRed = !nextIsRed;
	}
}
function StartGame() {
	enabled = true;
}