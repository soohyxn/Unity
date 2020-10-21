Shader "SSE/AllInOneEarth"
{
	Properties 
	{
_MainTex("_MainTex", 2D) = "black" {}
_BumpMap("_BumpMap", 2D) = "black" {}
_Glossiness("_Glossiness", Range(0,1) ) = 0.5
_SpecularColor("_SpecularColor", Color) = (1,1,1,1)
_IllumMap("_IllumMap", 2D) = "black" {}
_IllumPower("_IllumPower", Range(0,1) ) = 0.5
_IllumColor("_IllumColor", Color) = (0.8432836,0.5838117,0,1)
_CubeTex("_CubeTex", Cube) = "black" {}
_DecalMap("DecalMap", 2D) = "black" {}
_RimColor("RimColor", Color) = (1,1,1,1)

	}
	
	SubShader 
	{
		Tags
		{
"Queue"="Geometry"
"IgnoreProjector"="False"
"RenderType"="Opaque"

		}

		
Cull Back
ZWrite On
ZTest LEqual
ColorMask RGBA
Fog{
}


		CGPROGRAM
#pragma surface surf BlinnPhongEditor  vertex:vert
#pragma target 2.0


sampler2D _MainTex;
sampler2D _BumpMap;
float _Glossiness;
float4 _SpecularColor;
sampler2D _IllumMap;
float _IllumPower;
float4 _IllumColor;
samplerCUBE _CubeTex;
sampler2D _DecalMap;
float4 _RimColor;

			struct EditorSurfaceOutput {
				half3 Albedo;
				half3 Normal;
				half3 Emission;
				half3 Gloss;
				half Specular;
				half Alpha;
				half4 Custom;
			};
			
			inline half4 LightingBlinnPhongEditor_PrePass (EditorSurfaceOutput s, half4 light)
			{
half3 spec = light.a * s.Gloss;
half4 c;
c.rgb = (s.Albedo * light.rgb + light.rgb * spec);
c.a = s.Alpha;
return c;

			}

			inline half4 LightingBlinnPhongEditor (EditorSurfaceOutput s, half3 lightDir, half3 viewDir, half atten)
			{
				half3 h = normalize (lightDir + viewDir);
				
				half diff = max (0, dot ( lightDir, s.Normal ));
				
				float nh = max (0, dot (s.Normal, h));
				float spec = pow (nh, s.Specular*128.0);
				
				half4 res;
				res.rgb = _LightColor0.rgb * diff;
				res.w = spec * Luminance (_LightColor0.rgb);
				res *= atten * 2.0;

				return LightingBlinnPhongEditor_PrePass( s, res );
			}
			
			struct Input {
				float2 uv_MainTex;
float2 uv_BumpMap;
float2 uv_IllumMap;
float3 sWorldNormal;
float2 uv_DecalMap;
float3 viewDir;

			};

			void vert (inout appdata_full v, out Input o) {
float4 VertexOutputMaster0_0_NoInput = float4(0,0,0,0);
float4 VertexOutputMaster0_1_NoInput = float4(0,0,0,0);
float4 VertexOutputMaster0_2_NoInput = float4(0,0,0,0);
float4 VertexOutputMaster0_3_NoInput = float4(0,0,0,0);

o.sWorldNormal = mul((float3x3)_Object2World, SCALED_NORMAL);

			}
			

			void surf (Input IN, inout EditorSurfaceOutput o) {
				o.Normal = float3(0.0,0.0,1.0);
				o.Alpha = 1.0;
				o.Albedo = 0.0;
				o.Emission = 0.0;
				o.Gloss = 0.0;
				o.Specular = 0.0;
				o.Custom = 0.0;
				
float4 Tex2D0=tex2D(_MainTex,(IN.uv_MainTex.xyxy).xy);
float4 Tex2DNormal0=float4(UnpackNormal( tex2D(_BumpMap,(IN.uv_BumpMap.xyxy).xy)).xyz, 1.0 );
float4 Tex2D1=tex2D(_IllumMap,(IN.uv_IllumMap.xyxy).xy);
float4 Multiply0=_IllumColor * Tex2D1.aaaa;
float4 TexCUBE0=texCUBE(_CubeTex,float4( IN.sWorldNormal.x, IN.sWorldNormal.y,IN.sWorldNormal.z,1.0 ));
float4 Add0=Multiply0 + TexCUBE0;
float4 Multiply1=Add0 * _IllumPower.xxxx;
float4 Tex2D2=tex2D(_DecalMap,(IN.uv_DecalMap.xyxy).xy);
float4 Lerp0=lerp(Multiply1,Tex2D2,Tex2D2.aaaa);
float4 Fresnel0_1_NoInput = float4(0,0,1,1);
float4 Fresnel0=(1.0 - dot( normalize( float4( IN.viewDir.x, IN.viewDir.y,IN.viewDir.z,1.0 ).xyz), normalize( Fresnel0_1_NoInput.xyz ) )).xxxx;
float4 Pow0=pow(Fresnel0,float4( 3,3,3,3 ));
float4 Multiply2=_RimColor * Pow0;
float4 Add1=Lerp0 + Multiply2;
float4 Master0_5_NoInput = float4(1,1,1,1);
float4 Master0_7_NoInput = float4(0,0,0,0);
float4 Master0_6_NoInput = float4(1,1,1,1);
o.Albedo = Tex2D0;
o.Normal = Tex2DNormal0;
o.Emission = Add1;
o.Specular = _Glossiness.xxxx;
o.Gloss = _SpecularColor;

				o.Normal = normalize(o.Normal);
			}
		ENDCG
	}
	Fallback "Diffuse"
}