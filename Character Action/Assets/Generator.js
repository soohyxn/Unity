#pragma strict

var intervalMin : float = 0.5;
var intervalMax : float = 1.5;
var coinRate : float = 0.3;

var coinPrefab : GameObject;
var spikeBallPrefab : GameObject;

function Start () {
	while(true)
	{
		yield WaitForSeconds(Random.Range(intervalMin,intervalMax));
		
		var prefab : GameObject = Random.value < coinRate ? coinPrefab : spikeBallPrefab;
		var cheta : float = Random.Range(0.0,Mathf.PI * 2.0);
		var position : Vector3 = Vector3(Mathf.Cos(cheta),0.0,Mathf.Sin(cheta)*5.5);
		position.y = 2.5;
		
		Instantiate(prefab,position,Quaternion.identity);
	}
}

function Update () {

}
