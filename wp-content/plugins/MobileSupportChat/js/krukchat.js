// KrukChat For Wordpress (iPhone App is required)
// Kruk Chat is the simplest way to provide "Live Chat Support" in your wordpress and manage it via mobile app
// Kruk Chat iPhone App - https://itunes.apple.com/us/app/kruk-chat/id646106302?ls=1&mt=8 
// Wordpress plugin is available in http://codecanyon.net/item/kruk-chat-for-wordpress/4764722
// Code was Written by Kruk8989
// All right reserved 2013
// Version 1.3

    var blogURL = krukchatjsscript_vars.blogURL;
	var blogInfoName = krukchatjsscript_vars.blogInfoName;
	var krukchatBlinkingTitleLabel = krukchatjsscript_vars.krukchatBlinkingTitleLabel;
	
	var alertNameOffline = krukchatjsscript_vars.alertNameOffline;
	var alertEmailOffline = krukchatjsscript_vars.alertEmailOffline;
	var alertEmailUnvalidOffline = krukchatjsscript_vars.alertEmailUnvalidOffline;
	var alertQuestionOffline = krukchatjsscript_vars.alertQuestionOffline;
	
	var alertName = krukchatjsscript_vars.alertName;
	var alertEmail = krukchatjsscript_vars.alertEmail;
	var alertEmailUnvalid = krukchatjsscript_vars.alertEmailUnvalid;
	var alertQuestion = krukchatjsscript_vars.alertQuestion;
	
	var sentEmailSuccessfulMessage = krukchatjsscript_vars.sentEmailSuccessfulMessage;
	
	var krukchatorientation = krukchatjsscript_vars.krukchatorientation;
	
	var kruksessioncollapse = krukchatjsscript_vars.kruksessioncollapse;
	
	
	
	var userNameTextColor = krukchatjsscript_vars.userNameTextColor;
	var userMsgTextColor = krukchatjsscript_vars.userMsgTextColor;
	var userTimeTextColor = krukchatjsscript_vars.userTimeTextColor;
	
	var msgSeperatorColor = krukchatjsscript_vars.msgSeperatorColor;
	
	var adminNameTextColor= krukchatjsscript_vars.adminNameTextColor;
	var adminMsgTextColor = krukchatjsscript_vars.adminMsgTextColor;
	var adminTimeTextColor = krukchatjsscript_vars.adminTimeTextColor;
	
	var chatBoxBlinkingColor = krukchatjsscript_vars.chatBoxBlinkingColor;
	
	var chatBoxHeader = krukchatjsscript_vars.chatBoxHeader;
	var chatBoxBorder = krukchatjsscript_vars.chatBoxBorder;
	var krukChatjustNowLabel = krukchatjsscript_vars.krukChatjustNowLabel;
	
	var chatBoxHeight = krukchatjsscript_vars.chatBoxHeight;
	
	
	
	jQuery(document).ready(function() {
  		initKrukChat();
	});
	
	
	
	
	
	function sendEmailBtn(){
		
		
		var name = jQuery('#kruk-chat-send-email-name').val();
	var email = jQuery('#kruk-chat-send-email-email').val();
	var question = jQuery('#kruk-chat-send-email-question').val();
	
	
	if(name == "")
	{
		alert(alertNameOffline);	
	}
	else if(email == "")
	{
		
		alert(alertEmailOffline);
	}
	else if(validateEmailForm(email) == false)
	{
		alert(alertEmailUnvalidOffline);
		
	}
	else if(question == "")
	{
		
		alert(alertQuestionOffline);
	}
	else
	{
		
		jQuery('#kruk-chat-send-email-name').attr('disabled', 'disabled');
		jQuery('#kruk-chat-send-email-email').attr('disabled', 'disabled');
		jQuery('#kruk-chat-send-email-question').attr('disabled', 'disabled');
		jQuery('#sendEmailButton').attr('disabled', 'disabled');
	jQuery('#sendEmailButtonLoading').show();
	jQuery('#sendEmailButton').hide();
	jQuery.post(""+blogURL+"/?krukchat=postmethod&type=send_email_when_nobody_online",{user_name:name,user_message: question,user_email: email},function(result){
   
  			jQuery('#kruk-chat-send-email-name').val('');
			jQuery('#kruk-chat-send-email-email').val('');
			jQuery('#kruk-chat-send-email-question').val('');
			
			jQuery('#kruk-chat-send-email-name').attr('disabled', false);
		jQuery('#kruk-chat-send-email-email').attr('disabled', false);
		jQuery('#kruk-chat-send-email-question').attr('disabled', false);
			
			jQuery('#sendEmailButtonLoading').hide();
			jQuery('#sendEmailButton').show();
			
			alert(sentEmailSuccessfulMessage);
			
	});
	}
		
		
	}
	
	
	function startChatBtn(){
	
	var name = jQuery('#kruk-chat-name').val();
	var email = jQuery('#kruk-chat-email').val();
	var question = jQuery('#kruk-chat-problem').val();
	
	
	if(name == "")
	{
		alert(alertName);	
	}
	else if(email == "")
	{
		
		alert(alertEmail);
	}
	else if(validateEmailForm(email) == false)
	{
		alert(alertEmailUnvalid);
		
	}
	else if(question == "")
	{
		
		alert(alertQuestion);
	}
	else
	{
		
		jQuery('#kruk-chat-name').attr('disabled', 'disabled');
		jQuery('#kruk-chat-email').attr('disabled', 'disabled');
		jQuery('#kruk-chat-problem').attr('disabled', 'disabled');
		jQuery('#startBtn').attr('disabled', 'disabled');
	jQuery('#startChatLoading').show();
	jQuery('#startBtn').hide();
	jQuery.post(""+blogURL+"/?krukchat=postmethod&type=register",{krukpostname:name,krukpostemail: email,krukpostquestion: question},function(result){
   
  			
			initKrukChat();
			jQuery('#startChatLoading').hide();
			jQuery('#startBtn').show();
			
	});
	}
	
	
	
	
}


function validateEmailForm(email)
{
var x=email;
var atpos=x.indexOf("@");
var dotpos=x.lastIndexOf(".");
if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
  {
 
  return false;
  }
}



function email_validate(email)
{

var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})jQuery/;

if(regMail.test(email) == false)
{

return false;

}
else
{

return true;	

}
}
	var chatname;
	var userEmail;
	var refreshId;
	var heartcounter;
	
	function initKrukChat(){
	var items = [];
	jQuery.ajax({
        'async': false,
        'global': false,
        'url': ''+blogURL+'/?krukchat=heartbeat',
        'dataType': "json",
        'success': function (data) {
          
    			
				
					if(data.status == "OK")
					{
					
						chatName = data.chat_name;
						userEmail = data.chat_email;
						heartcounter = data.count;

					
						var countMsg = 0;
						jQuery.each(data.message, function(key, val) {
    						
							countMsg++;
							
							
							
							
							
							if(countMsg == 1)
							{
								
								
							
							if(krukchatorientation == "righttoleft")
							{
							
									if(val.indicator == "0")
								{
							items.push(' <div style="text-align:right; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+';text-align:right;">'+val.msg+'</div><div align="left"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								else
								{
									items.push(' <div style="text-align:right; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+adminNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+adminMsgTextColor+'; text-align:right;">'+val.msg+'</div><div align="left"><span style="font-size:9px; color: #'+adminTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
									
							}
							else{
							
							
							
							if(val.indicator == "0")
								{
							items.push(' <div style="text-align:left; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+';">'+val.msg+'</div><div align="right"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								else
								{
									items.push(' <div style="text-align:left; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+adminNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+adminMsgTextColor+';">'+val.msg+'</div><div align="right"><span style="font-size:9px; color: #'+adminTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
					
							
							 
								}
								
								
								
							}
							else
							{
								
							
								if(krukchatorientation == "righttoleft")
								{
								
								if(val.indicator == "0")
								{
					
								
								items.push(' <div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:right; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+'; text-align:right;">'+val.msg+'</div><div align="left"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								else
								{
									
									
									items.push(' <div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:right; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+adminNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+adminMsgTextColor+'; text-align:right;">'+val.msg+'</div><div align="left"><span style="font-size:9px; color: #'+adminTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								
								}else{
								
								
								
								
								if(val.indicator == "0")
								{
					
								
								items.push(' <div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:left; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+';">'+val.msg+'</div><div align="right"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								else
								{
									
									
									items.push(' <div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:left; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+adminNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+adminMsgTextColor+';">'+val.msg+'</div><div align="right"><span style="font-size:9px; color: #'+adminTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								
								}
								
								
								
								
							}
							
							
   						 });
						 
						 jQuery("#krukChatConvList").html(items.join(''));
						  jQuery("#krukstartChat").hide();
						 jQuery("#kruk-conv").show();
						 
						  jQuery('.kruk-chat-wrap').scrollTo( '100%', '100%' );
						  activateHeartBeat();
						 
					}
					else
					{
						 jQuery("#krukstartChat").show();
						 jQuery("#kruk-conv").hide();
							
					}
	
	
	 }});
	 
	 
	 
	 
	}
	
	
	function activateHeartBeat(){
		
	refreshId = setInterval(function()
	{
		var items = [];
		jQuery.ajax({
        'async': false,
        'global': false,
        'url': ''+blogURL+'/?krukchat=heartbeat',
        'dataType': "json",
        'success': function (data) {
			
			if(data.status == "OK")
			{
				
				
				if(data.count > heartcounter)
				{
					
					
					
						didReceiveNewMessage();
						var countMsg =0;
						jQuery.each(data.message, function(key, val) {
    			
								countMsg++;
								
							if(countMsg == 1)
							{
								
							
							
							if(krukchatorientation == "righttoleft")
								{
									if(val.indicator == "0")
								{
							items.push(' <div style="text-align:right; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+';text-align:right;">'+val.msg+'</div><div align="left"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								else
								{
									items.push(' <div style="text-align:right; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+adminNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+adminMsgTextColor+'; text-align:right;">'+val.msg+'</div><div align="left"><span style="font-size:9px; color: #'+adminTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
									
								}else{
							
							
							
							if(val.indicator == "0")
								{
							items.push(' <div style="text-align:left; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+';">'+val.msg+'</div><div align="right"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								else
								{
									items.push(' <div style="text-align:left; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+adminNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+adminMsgTextColor+';">'+val.msg+'</div><div align="right"><span style="font-size:9px; color: #'+adminTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								
							}
							
								
								
								
							}
							else
							{
								
							
									if(krukchatorientation == "righttoleft")
									{
								
								
								if(val.indicator == "0")
								{
					
								
								items.push(' <div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:right; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+'; text-align:right;">'+val.msg+'</div><div align="left"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								else
								{
									
									
									items.push(' <div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:right; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+adminNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+adminMsgTextColor+'; text-align:right;">'+val.msg+'</div><div align="left"><span style="font-size:9px; color: #'+adminTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								
									}else{
								
								
								
								if(val.indicator == "0")
								{
					
								
								items.push(' <div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:left; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+';">'+val.msg+'</div><div align="right"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								else
								{
									
									
									items.push(' <div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:left; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+adminNameTextColor+';">'+val.user_name+'</div><div style="font-size:14px; margin-top:5px; color:#'+adminMsgTextColor+';">'+val.msg+'</div><div align="right"><span style="font-size:9px; color: #'+adminTimeTextColor+'; font-weight:normal;">'+val.time+'</span></div></div>');
								}
								
								}
								
								
								
								
							}
							
							
						});
						
						jQuery("#krukChatConvList").html(items.join(''));
						jQuery('.kruk-chat-wrap').scrollTo( '100%', '100%' );
						heartcounter = data.count;
				}
			
			}
			  
		 }
   		 });
		
	}, 5000);
		
	}
	
	
	
	function didReceiveNewMessage(){
		
		
		
		blinkingBackground();
	}
	
	
	
	
	var blinkingcolour = false;
	var blinkingcolour2 = false;
	var blinkingcolour3 = false;
	var keepBlinkSolution = false;
	var blinkingcolorinterval;
	var blinkingcolorinterval2;
	var blinkingcolorinterval3;
	function blinkingBackground() {
    // Set the color the field should blink in
	
	if(keepBlinkSolution == false)
	{
	
	keepBlinkSolution = true;
	
    
			blinkingcolorinterval= setInterval(function() {
				
				
				if(blinkingcolour == false)
				{
				jQuery("#krukchat_box div.kruk-chat-header").css("background-color","#"+chatBoxBlinkingColor+"");
				blinkingcolour = true;
				}
				else
				{
					jQuery("#krukchat_box div.kruk-chat-header").css("background-color","#"+chatBoxHeader+"");
					blinkingcolour = false;
				}
			 }, 500);
		
	
	
	
		blinkingcolorinterval2= setInterval(function() {
				
				
				if(blinkingcolour2 == false)
				{
				jQuery(".kruk-chat-wrap").css("border-color","#"+chatBoxBlinkingColor+"");
				blinkingcolour2 = true;
				}
				else
				{
					jQuery(".kruk-chat-wrap").css("border-color","#"+chatBoxBorder+"");
					blinkingcolour2 = false;
				}
			 }, 500);
			 
			 blinkingcolorinterval3= setInterval(function() {
				
				
				if(blinkingcolour3 == false)
				{
				document.title = krukchatBlinkingTitleLabel;
				blinkingcolour3 = true;
				}
				else
				{
					document.title = blogInfoName;
					blinkingcolour3 = false;
				}
			 }, 500);
		 
		 
	}
	
	
  }
  
  function stopBlinking(){
		keepBlinkSolution = false;
	clearInterval(blinkingcolorinterval);
	clearInterval(blinkingcolorinterval2);	
	clearInterval(blinkingcolorinterval3);
	jQuery("#krukchat_box div.kruk-chat-header").css("background-color","#"+chatBoxHeader+"");
	jQuery(".kruk-chat-wrap").css("border-color","#"+chatBoxBorder+"");
	document.title = blogInfoName;
	
	}
	
	function krukReplyOnFocus()
	{
	stopBlinking();
	
	jQuery(document).keypress(function(e) {
    if(e.which == 13) {
       
	   textbox = jQuery('#kruk-reply').val();
		if(textbox == "")
		{
			
		}
		else
		{
			 jQuery('#kruk-reply').val('');
			 
		
		if(krukchatorientation == "righttoleft")
		{
		
		 jQuery("#krukChatConvList").append('<div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:right; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+chatName+'</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+'; text-align:right;">'+textbox+'</div><div align="left"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+krukChatjustNowLabel+'</span></div></div>');
		
		}else{
		
		
		
		 jQuery("#krukChatConvList").append('<div><hr style="background-color:#'+msgSeperatorColor+'" class="hrclass" /></div><div style="text-align:left; padding-bottom:10px;"><div style="font-size:14px; font-weight:bold; color:#'+userNameTextColor+';">'+chatName+' :</div><div style="font-size:14px; margin-top:5px; color:#'+userMsgTextColor+';">'+textbox+'</div><div align="right"><span style="font-size:9px; color: #'+userTimeTextColor+'; font-weight:normal;">'+krukChatjustNowLabel+'</span></div></div>');
		
		}
		
			 
			
			 jQuery('.kruk-chat-wrap').scrollTo( '100%', '100%' );
			 heartcounter = heartcounter + 1;
			 jQuery('#loadingReply').show();
			 jQuery.post(""+blogURL+"/?krukchat=postmethod&type=msgpost",{userMsg:textbox},function(result){
   
  			
				
			jQuery('#loadingReply').hide();
			});
			 
			
			
			
		
		}
		
    }
	});
	
	}

var colapseIndicator;
	
	if(kruksessioncollapse == "close")
	{
		jQuery(document).ready(function() {
  		jQuery("#krukchat_box").animate({height:""+chatBoxHeight+"px"},200);
		colapseIndicator = true;
	});
		

			
	}
	else if(kruksessioncollapse == "open")
	{
jQuery(document).ready(function() {
jQuery("#krukchat_box").animate({height:"37px"},200);
				colapseIndicator = false;
				});

	}else{
jQuery(document).ready(function() {
jQuery("#krukchat_box").animate({height:"37px"},200);
				colapseIndicator = false;
				});

	}
	function colapse(){
		
		if(colapseIndicator == true)
		{
			jQuery("#krukchat_box").animate({height:"37px"},200);
				colapseIndicator = false;
				
				var textbox;
		jQuery.post(""+blogURL+"/?krukchat=postmethod&type=sessioncollapseopen",{userMsg:textbox},function(result){
   
  			
				
			
			});
			
		}
		else
		{
			
			jQuery("#krukchat_box").animate({height:""+chatBoxHeight+"px"},200);
			colapseIndicator = true;
			
			var textbox;
		jQuery.post(""+blogURL+"/?krukchat=postmethod&type=sessioncollapseclose",{userMsg:textbox},function(result){
   
  			
				
			
			});
		}
		
	}