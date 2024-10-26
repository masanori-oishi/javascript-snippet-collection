/**
 * @author masanori-oishi
 */

/**
 * @description
 * モーダル開閉 メソッド解説
 *
 * $(document).ready()
 * DOMが完全に読み込まれた後に実行される関数
 * @method ready
 *
 * $(selector).click()
 * 要素にクリックイベントハンドラを設定する、または要素のクリックイベントをトリガーするメソッド
 * @method click
 *
 * $(selector).show()
 * 要素を表示するメソッド。非表示に設定された要素を表示状態にします。
 * @method show
 *
 * $(selector).hide()
 * 要素を非表示にするメソッド。要素を表示しない状態にします。
 * @method hide
 *
 * $(selector).is()
 * 要素が特定のセレクタに一致するかどうかを判断するメソッド。条件に一致する場合は `true`、それ以外は `false` を返します。
 * @method is
 *
 * @memberof jQuery - jQueryでのメソッド解説になります。
 *
 */

/**
 * @description
 * モーダル開閉処理
 *
 */
$(function () {
  /**
   * モーダルを開く
   * IDがopenModalの要素がクリックされたときにIDがmyModalの要素を表示します。
   * @event click
   */
  $("#openModal").click(function () {
    console.log("テスト");
    $("#myModal").show();
  });

  /**
   * モーダルを閉じる
   * クラスがcloseの要素がクリックされたときにIDがmyModalの要素を非表示にします。
   * @event click
   */
  $(".close").click(function () {
    $("#myModal").hide();
  });
  /**
   * モーダル外をクリックして閉じる
   * ウィンドウ上でクリックされたときに、クリックされた要素がIDがmyModalの要素であれば、IDがmyModalの要素を非表示にします。
   * モーダル内の要素はidがmyModalではないため判定されません。
   * @event click
   * @param {Object} event - クリックイベント
   */
  $(window).click(function (event) {
    if ($(event.target).is("#myModal")) {
      $("#myModal").hide();
    }
  });

  // ハンバーガーメニューの開閉処理
  $("#hamburger").on("click", function () {
    $("#nav-menu").toggleClass("active");
    $(this).toggleClass("active");
  });

  // アコーディオンヘッダーがクリックされたときの処理
  $(".accordion-header").on("click", function () {
    var parent = $(this).parent();
    var content = $(this).next(".accordion-content");
    var isActive = parent.hasClass("active");

    if (isActive) {
      // 非アクティブにする
      content.css("max-height", "0");
      parent.removeClass("active");
      $(this).attr("aria-expanded", "false");
      content.attr("aria-hidden", "true");
    } else {
      // 他のアクティブなアイテムを閉じる
      $(".accordion-item").removeClass("active");
      $(".accordion-content").css("max-height", "0");
      $(".accordion-header").attr("aria-expanded", "false");
      $(".accordion-content").attr("aria-hidden", "true");

      // クリックされたアイテムをアクティブにする
      parent.addClass("active");
      content.css("max-height", content.prop("scrollHeight") + "px");
      $(this).attr("aria-expanded", "true");
      content.attr("aria-hidden", "false");
    }
  });

  // タブインターフェース
  // タブがクリックされたときの処理
  $(".tab").on("click", function () {
    var tab_id = $(this).data("tab");

    // すべてのタブから.activeクラスを削除
    $(".tab").removeClass("active");
    // すべてのタブコンテンツから.activeクラスを削除
    $(".tab-content").removeClass("active");

    // クリックされたタブに.activeクラスを追加
    $(this).addClass("active");
    // 対応するタブコンテンツに.activeクラスを追加
    $("#" + tab_id).addClass("active");
  });

  // ドロップダウンメニュー
  // ドロップダウンのトグル
  $(".dropdown-toggle").on("click", function (e) {
    e.preventDefault(); // デフォルトのリンク動作を防ぐ
    var parent = $(this).parent();

    // 他のドロップダウンを閉じる
    $(".nav-item.dropdown").not(parent).removeClass("active");

    // クリックされたドロップダウンをトグル
    parent.toggleClass("active");
  });

  // ドロップダウン外をクリックした場合にメニューを閉じる
  $(document).on("click", function (e) {
    var target = $(e.target);
    if (!target.closest(".nav-item.dropdown").length) {
      $(".nav-item.dropdown").removeClass("active");
    }
  });

  // スクロールアニメーション
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // isElementInViewportでビューポート内に表示されているかを判定し、ビューポート内の時にactiveクラスを付与する。
  // スタイルのopacityを1にしてふわっと表示
  function checkScroll() {
    $(".scroll-animate").each(function () {
      if (isElementInViewport(this)) {
        $(this).addClass("active");
      }
    });
  }

  // 初期チェック
  checkScroll();

  // スクロールイベントに関数をバインド
  // スクロール時にビューポート内かチェックされる。
  $(window).on("scroll resize", function () {
    checkScroll();
  });
});
