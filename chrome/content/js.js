﻿var myExtension = {
	init: function(bind) {
		if (bind==null && (bind=gBrowser)==null) return;
        bind.addEventListener("DOMContentLoaded", this.onPageLoad, false);
    },
    onPageLoad: function(aEvent) {
        var doc = aEvent?(aEvent.originalTarget||aEvent.target):window.document;
        var win = doc.defaultView;
		var lct=doc.location?doc.location.href:null;
		var onLoad=aEvent==null || aEvent.type=="DOMContentLoaded";
		if (!onLoad) return;
        if (onLoad &&(
			!doc.body ||
			!lct ||
			(lct.indexOf("http")!=0 && lct.indexOf("file")!=0)
		)) return;
		var obj= {
			save:function () {
				var popup=0;
				var toc=document.getElementById("toc");
				if (toc==null) {
					toc=window.parent.document.getElementById("toc");
					if (toc!=null) popup=1;
				}
				if (toc==null || toc.selectedOptions==null || toc.selectedOptions.length==0) return;
				var title=toc.selectedOptions[0].label.replace(/^\s+|\s+$/g,"");
//				window.alert(title);
				var ch=null;
				var i,a;
				for (i=(toc.selectedOptions[0].index-1);(i>=0 && ch==null);i--) {
					a=toc.options[i].label.replace(/^\s+|\s+$/g,"")
					if (/^(Cap|Chap)\.\s+(\d+)\..+$/i.test(a)) {
						ch=a.replace(/^(Cap|Chap)\.\s+(\d+)\..+$/ig,"$2");
					}
				}
//				window.alert(toc.selectedOptions[0]);
//				window.alert(ch);
				if (ch==null) {
				    h1 = document.getElementsByTagName('h1');
				    r = h1[0].textContent.split('.');
				    ch = r[0];
				}
				title=((Number(ch)+100)+"").substring(1)+"."+((Number(toc.selectedOptions[0].index-i+1)+100)+"").substring(1)+"_"+title.replace(/\s+/g,"_");
				if (popup==1) {
					tt=window.parent.document.getElementsByClassName("DLG_Triv_titleText")[0];
					if (tt) {
						document.title=tt.innerText.replace(/^\s+|\s+$/g,"");
					}
					title=title+"_popup";
				}

				var imgs=document.getElementsByTagName("img");
				for (i=0;i<imgs.length;i++) {
					img=imgs[i];
					img.src=img.src;
				}

				var f="LFS258_"+title+".html";

				var textToWrite = document.documentElement.outerHTML;
				var textFileAsBlob = new Blob([textToWrite], {type:'text/html'});
				var fileNameToSaveAs = f;
				var downloadLink = document.createElement("a");
				downloadLink.download = fileNameToSaveAs;
				downloadLink.innerHTML = "Download File";
				downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
				downloadLink.click();
			},
			nav:function() {
				/** this one is for Spanish version (not confirmed) */
				//var a=document.getElementsByName("45297anc");
				/** this one is for English version (confirmed, March 2017) */
				var a=document.getElementsByName("13887anc");
				if (a.length==1) {
					a[0].click();
				} else {
					var a=document.getElementsByName("13924anc");
					if (a.length==1) a[0].click();
				}
			},
			run:function(doc){
				setTimeout(this.save,2000);
				setTimeout(this.nav,5000);
			}
		}
		obj.run(doc);
    }
}
