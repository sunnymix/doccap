package com.sunnymix.wingdoc.repo;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Mark;
import com.sunnymix.wingdoc.dao.jooq.tables.records.MarkRecord;
import com.sunnymix.wingdoc.data.form.MarkAddForm;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.data.io.Page;
import lombok.Getter;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.sunnymix.wingdoc.dao.jooq.Tables.MARK;

/**
 * @author sunnymix
 */
@Repository
public class MarkRepo {

    @Getter
    @Autowired
    @Qualifier("dslContext")
    private DSLContext dsl;

    public Out<List<Mark>> query() {
        List<Mark> marks = dsl
                .selectFrom(MARK)
                .orderBy(MARK.ID.desc())
                .fetchStreamInto(Mark.class)
                .collect(Collectors.toList());
        return Out.ok(Page.list(marks.size()), marks);
    }

    public Out<Boolean> add(MarkAddForm form) {
        _delete(form.getDocId());

        MarkRecord record = form.toRecord();
        dsl.executeInsert(record);
        return Out.ok(true);
    }

    public Out<Boolean> delete(String docId) {
        return Out.ok(_delete(docId));
    }

    private boolean _delete(String docId) {
        dsl
                .deleteFrom(MARK)
                .where(MARK.DOC_ID.eq(docId))
                .execute();
        return true;
    }

}
