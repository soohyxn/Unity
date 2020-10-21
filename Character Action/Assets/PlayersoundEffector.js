#pragma strict

var coinSE : AudioClip;
var damageSE : AudioClip;
var jumpSE : AudioClip;
var afterjumpSE : AudioClip;

function Start () {

}

function Update () {
	if(Input.GetButtonDown("Jump"))
		audio.PlayOneShot(jumpSE);				
}
function CatchCoin(amount : int) {
	audio.PlayOneShot(coinSE);
}
function ApplyDamage(amount : int) {
	audio.PlayOneShot(damageSE);
}
